importScripts("../vendor/occt-import-js/occt-import-js.js");

self.addEventListener("message", async (event) => {
  const { source } = event.data;

  try {
    const occt = await self.occtimportjs({
      locateFile: (path) => `../vendor/occt-import-js/${path}`
    });
    const response = await fetch(source);

    if (!response.ok) {
      throw new Error(`Unable to load STEP file: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    const result = occt.ReadStepFile(new Uint8Array(buffer), {
      linearUnit: "millimeter",
      linearDeflectionType: "bounding_box_ratio",
      linearDeflection: 0.0008,
      angularDeflection: 0.2
    });

    self.postMessage({ result });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : "Unable to load STEP model."
    });
  }
});
