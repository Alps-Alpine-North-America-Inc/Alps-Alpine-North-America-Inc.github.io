import * as THREE from "../vendor/three/three.module.min.js";
import { OrbitControls } from "../vendor/three/OrbitControls.js";

const createMaterial = (meshColor) => {
  if (!meshColor) {
    return new THREE.MeshStandardMaterial({
      color: 0xb8beca,
      metalness: 0.12,
      roughness: 0.42
    });
  }

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(meshColor[0], meshColor[1], meshColor[2]),
    metalness: 0.08,
    roughness: 0.48
  });
};

const materialColorKey = (meshColor) => {
  if (!meshColor) {
    return "default";
  }

  return meshColor.map((channel) => channel.toFixed(4)).join(",");
};

const createMaterialSet = (geometryMesh) => {
  const materials = [createMaterial(geometryMesh.color)];
  const materialIndexes = new Map([[materialColorKey(geometryMesh.color), 0]]);

  const getMaterialIndex = (meshColor) => {
    const key = materialColorKey(meshColor);
    const existingIndex = materialIndexes.get(key);

    if (existingIndex !== undefined) {
      return existingIndex;
    }

    const nextIndex = materials.length;
    materials.push(createMaterial(meshColor || geometryMesh.color));
    materialIndexes.set(key, nextIndex);

    return nextIndex;
  };

  return { getMaterialIndex, materials };
};

const applyFaceMaterialGroups = (geometry, geometryMesh, getMaterialIndex) => {
  const faceColors = geometryMesh.brep_faces || [];

  if (faceColors.length === 0) {
    return;
  }

  const triangleCount = geometryMesh.index.array.length / 3;
  let triangleIndex = 0;
  let faceIndex = 0;

  while (triangleIndex < triangleCount) {
    const currentFace = faceColors[faceIndex];
    const firstTriangle = triangleIndex;
    let lastTriangle = triangleCount;
    let materialIndex = 0;

    if (currentFace && triangleIndex < currentFace.first) {
      lastTriangle = currentFace.first;
    } else if (currentFace) {
      lastTriangle = currentFace.last + 1;
      materialIndex = getMaterialIndex(currentFace.color);
      faceIndex += 1;
    }

    geometry.addGroup(firstTriangle * 3, (lastTriangle - firstTriangle) * 3, materialIndex);
    triangleIndex = lastTriangle;
  }
};

const buildMeshGroup = (result) => {
  const group = new THREE.Group();
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0x101725,
    opacity: 0.5,
    transparent: true
  });

  result.meshes.forEach((geometryMesh) => {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(geometryMesh.attributes.position.array, 3)
    );

    if (geometryMesh.attributes.normal) {
      geometry.setAttribute(
        "normal",
        new THREE.Float32BufferAttribute(geometryMesh.attributes.normal.array, 3)
      );
    }

    geometry.setIndex(Array.from(geometryMesh.index.array));

    const { getMaterialIndex, materials } = createMaterialSet(geometryMesh);
    applyFaceMaterialGroups(geometry, geometryMesh, getMaterialIndex);

    const mesh = new THREE.Mesh(geometry, materials.length > 1 ? materials : materials[0]);
    group.add(mesh);

    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 8), edgeMaterial);
    group.add(edges);
  });

  return group;
};

const loadStepModel = (source) => new Promise((resolve, reject) => {
  const worker = new Worker(new URL("./step-model-worker.js", import.meta.url));

  worker.addEventListener("message", (event) => {
    const { error, result } = event.data;
    worker.terminate();

    if (error) {
      reject(new Error(error));
      return;
    }

    resolve(result);
  });

  worker.addEventListener("error", (event) => {
    worker.terminate();
    reject(new Error(event.message || "3D model worker failed."));
  });

  worker.postMessage({ source });
});

const frameObject = (camera, controls, object) => {
  object.rotation.x = -Math.PI / 2;
  object.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(object);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z) || 1;

  object.position.sub(center);

  camera.up.set(0, 1, 0);
  camera.near = Math.max(maxDimension / 100, 0.1);
  camera.far = maxDimension * 30;
  camera.position.set(maxDimension * 0.55, maxDimension * 1.25, maxDimension * 1.45);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  controls.target.set(0, 0, 0);
  controls.minDistance = maxDimension * 0.55;
  controls.maxDistance = maxDimension * 6;
  controls.update();
};

const initializeViewer = async (viewer) => {
  const source = viewer.dataset.stepSrc;
  const status = viewer.querySelector("[data-step-viewer-status]");
  const mountPoint = viewer.querySelector("[data-step-viewer-canvas]");

  if (!source || !mountPoint || !globalThis.Worker) {
    if (status) {
      status.textContent = "3D model viewer is unavailable.";
      status.classList.add("is-error");
    }
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mountPoint.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.85;
  controls.enablePan = true;
  controls.screenSpacePanning = true;

  scene.add(new THREE.AmbientLight(0xffffff, 1.6));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, -6, 8);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xa9c7ff, 1.4);
  fillLight.position.set(-6, 5, 4);
  scene.add(fillLight);

  try {
    const result = await loadStepModel(source);

    if (!result.success || !result.meshes || result.meshes.length === 0) {
      throw new Error("No mesh data was produced from the STEP file.");
    }

    const object = buildMeshGroup(result);
    scene.add(object);
    frameObject(camera, controls, object);

    if (status) {
      status.classList.add("is-hidden");
    }
  } catch (error) {
    if (status) {
      status.textContent = "Unable to load this 3D model right now.";
      status.classList.add("is-error");
    }
    console.error(error);
  }

  const resize = () => {
    const width = mountPoint.clientWidth;
    const height = mountPoint.clientHeight;

    if (width <= 0 || height <= 0) {
      return;
    }

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });

  resizeObserver.observe(viewer);
  resize();

  const renderLoop = () => {
    controls.update();
    renderer.render(scene, camera);
    globalThis.requestAnimationFrame(renderLoop);
  };

  renderLoop();
};

document.addEventListener("DOMContentLoaded", () => {
  const viewers = document.querySelectorAll("[data-step-viewer]");
  viewers.forEach((viewer) => {
    initializeViewer(viewer);
  });
});
