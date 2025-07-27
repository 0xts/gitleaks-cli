### Gitleaks CLI

Current gitleaks version v8.28.0

This package provides with a way to execute [gitleaks](https://github.com/gitleaks/gitleaks) cli in your javascript repository and can be used with git hooks to enable detecting secrets like passwords, API keys, and tokens in git repos, files.

## Table of Contents

- [Installation](#installation)
- [Configuration & Usage](#configuration--usage)
- [Known Issues](#known-issues)
- [Licensing](#licensing)

## Installation

To install and use this package simply run install with your preferred package manager -

```sh
# For npm
npm install -D @0xts/gitleaks-cli

# For yarn
yarn add -D @0xts/gitleaks-cli

# For pnpm
pnpm add -D @0xts/gitleaks-cli
```

## Configuration & Usage

After adding the package, the cli will be available for usage. You can add it to your pre-commit hook to enable scanning before committing -

```sh
gitleaks dir -v --no-banner
```

Alternatively, you can execute it directly using `npx` like so -

```sh
npx --package @0xts/gitleaks-cli -- gitleaks dir -v --no-banner
```

Check [gitleaks](https://github.com/gitleaks/gitleaks) documentation for extensive configuration and usage options.

## Known Issues

This package contains a WASM compiled binary that's used to run the cli using [Nodejs WebAssembly API](https://nodejs.org/en/learn/getting-started/nodejs-with-webassembly) and hence is limited in its functionality by the WASM spec. Specifically, from my random test the `gitleaks git` command won't work, because it requires [pipe](https://man7.org/linux/man-pages/man2/pipe.2.html) syscall, which isn't available in current WASM implementations, and hence you'll see an error like so -

```
    ○
    │╲
    │ ○
    ○ ░
    ░    gitleaks

3:15PM FTL could not create Git log cmd error="pipe: not implemented on js"
```

This isn't just for WASM but also WASI environment.

## Licensing

This project uses a [BSD 3-Clause License](./LICENSE)
