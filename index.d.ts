///<reference types="node" />
/**
 *
 * Function wrapping the gitleaks CLI functionality.
 *
 * @param args - The command line arguments passed to the CLI.
 * @param exit - The process exit function, used to terminate the process.
 * @param env - The environment variables available to the process.
 *
 * @returns void
 * @description
 * This function serves as the entry point for the gitleaks CLI.
 * It processes the command line arguments, executes the gitleaks wasm binary.
 */
declare const cli: (
  args: string[],
  exit: NodeJS.Process["exit"],
  env: NodeJS.ProcessEnv
) => void;

declare module "@0xts/gitleaks-cli" {
  export default cli;
}
