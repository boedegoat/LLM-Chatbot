# 🚀 Hacktrilize

## How to Run Locally
> For windows, run the following commands in WSL2

### 1. Install `dfx` with the following command:
You can install the developer tools natively or use Dev Containers.

#### Option 1: Natively install developer tools

> Installing `dfx` natively is currently only supported on macOS and Linux systems. On Windows, it is recommended to use the Dev Containers option.

1. Install `dfx` with the following command:

```

sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

```

> On Apple Silicon (e.g., Apple M1 chip), make sure you have Rosetta installed (`softwareupdate --install-rosetta`).

2. [Install NodeJS](https://nodejs.org/en/download/package-manager).

3. For Motoko projects, you will also need to:

- Install the Motoko package manager [Mops](https://docs.mops.one/quick-start#2-install-mops-cli): `npm i -g ic-mops`

### 2. Run the following commands to setup, deploy to ICP playground, and start the project

```bash
chmod +x setup.sh
./setup.sh
npm run dev
```
