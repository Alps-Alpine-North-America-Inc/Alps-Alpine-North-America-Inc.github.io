function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  return fallbackCopyText(text);
}

document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy-code]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const wrapper = button.closest(".guide-code-block-wrap");
      const code = wrapper?.querySelector("code");

      if (!code) {
        return;
      }

      const originalLabel = button.textContent;
      const codeText = code.textContent ?? "";

      try {
        const copied = await copyText(codeText);
        button.textContent = copied ? "Copied" : "Copy Failed";
      } catch {
        button.textContent = "Copy Failed";
      }

      window.setTimeout(() => {
        button.textContent = originalLabel;
      }, 1600);
    });
  });
});
