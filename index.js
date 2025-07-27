const { tmpdir } = require("node:os");

const read = require("./read");
const wasmExec = require("./go");

const args = process.argv.slice(1);
const exit = process.exit;

// Currently we cannot pass all the available environment variables to the Go WASM runtime.
// This is a workaround to pass only the necessary environment variables.
// reference - https://github.com/golang/go/blob/fcd14bdcbdfbb5b0c79cfecff95291837836a76d/misc/wasm/wasm_exec.js#L520-L525
const env = {
  TEMPDIR: tmpdir(),
  PATH: process.env.PATH,
  SHELL: process.env.SHELL,
  HOME: process.env.HOME,
  USER: process.env.USER,
  PWD: process.env.PWD,
  EDITOR: process.env.EDITOR,
  LANG: process.env.LANG,
  HOSTNAME: process.env.HOSTNAME,
  TERM: process.env.TERM,
  NODE_ENV: process.env.NODE_ENV,
  ...Object.fromEntries(
    Object.entries(process.env).filter(([key]) => key.startsWith("GITLEAKS_"))
  ),
};

function cli(_args, _exit, _env) {
  wasmExec(read(), _args ?? args, _exit ?? exit, _env ?? env);
}

module.exports = cli;
