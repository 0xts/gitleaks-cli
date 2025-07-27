const { dirname, join } = require("node:path");
const { brotliDecompressSync } = require("node:zlib");
const { readFileSync, writeFileSync, existsSync } = require("node:fs");

const packageJson = require("./package.json");

const GITLEAKS_WASM = "gitleaks.wasm";
const GITLEAKS_WASM_BROTLI = GITLEAKS_WASM + ".br";

function getWasmPath() {
  const p1 = join(__dirname, "wasm", GITLEAKS_WASM_BROTLI);
  if (existsSync(p1)) {
    return p1;
  }
  const p2 = join(
    dirname(require.resolve(packageJson.name)),
    "wasm",
    GITLEAKS_WASM_BROTLI
  );
  if (existsSync(p2)) {
    return p2;
  }
  return "./wasm/" + GITLEAKS_WASM_BROTLI;
}

const wasmPath = getWasmPath();

function isDecompressed(path) {
  return existsSync(path);
}

function read() {
  const writePath = join(dirname(wasmPath), GITLEAKS_WASM);
  if (isDecompressed(writePath)) {
    return readFileSync(writePath);
  }
  const wasmBinary = brotliDecompressSync(readFileSync(wasmPath));
  writeFileSync(writePath, wasmBinary);
  if (!isDecompressed(writePath)) {
    console.error(
      `[${packageJson.name}]: Failed to decompress gitleaks wasm binary.`
    );
    process.exit(1);
  }
  return wasmBinary;
}

module.exports = read;
