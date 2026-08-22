function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightCpp(code) {
  const keywords = new Set([
    "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "return", "true", "false",
    "class", "struct", "public", "private", "protected", "namespace", "using", "const", "static", "void", "new",
    "delete", "auto", "sizeof", "nullptr", "enum"
  ]);
  const types = new Set([
    "bool", "char", "double", "float", "int", "long", "short", "signed", "unsigned", "uint8_t", "uint16_t",
    "uint32_t", "uint64_t", "int8_t", "int16_t", "int32_t", "int64_t", "String"
  ]);
  const tokenPattern = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|^\s*#[^\n]*|\b(?:[A-Za-z_]\w*)\b|\b\d+(?:\.\d+)?(?:[fFuUlL]+)?\b/gm;

  return code.replace(tokenPattern, (token) => {
    let tokenClass = "";

    if (token.startsWith("//") || token.startsWith("/*")) {
      tokenClass = "token-comment";
    } else if (token.startsWith("\"") || token.startsWith("'")) {
      tokenClass = "token-string";
    } else if (token.trimStart().startsWith("#")) {
      tokenClass = "token-preprocessor";
    } else if (/^\d/.test(token)) {
      tokenClass = "token-number";
    } else if (keywords.has(token)) {
      tokenClass = "token-keyword";
    } else if (types.has(token)) {
      tokenClass = "token-type";
    } else if (/\w/.test(token)) {
      tokenClass = "token-function";
    }

    return tokenClass ? `<span class="${tokenClass}">${escapeHtml(token)}</span>` : escapeHtml(token);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll('code[data-language="cpp"], code.language-cpp');

  codeBlocks.forEach((codeBlock) => {
    if (codeBlock.dataset.highlighted === "true") {
      return;
    }

    codeBlock.innerHTML = highlightCpp(codeBlock.textContent || "");
    codeBlock.dataset.highlighted = "true";
  });
});
