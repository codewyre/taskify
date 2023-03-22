# Sample Todo List Application

Done with:

- SpringBoot (API)
- Solid.js (Web App)
- Keycloak (Authentication)
- Docker for Desktop (Local Environment Setup)

## Development

### Workflow

n/a

### Prerequisites

#### Required Tools

| Name      | Version                            | Source   | Comments                      |
|-----------|------------------------------------|----------|-------------------------------|
| Node.js   | Latest, project built using 16.19.1   | nvm/brew | Used for the Web project. Refer to `./web/.nvmrc` for more info |
| Java   | 19, built with coretto-19.0.2.7.1   | apt/asdf-vm, etc. |  |
| Docker   | Latest   |  | Used for the API project. **❗ Hint: When using WSL, you need to activate Docker-Compose V2 and WSL Integration in your Docker for Desktop Config** |

#### Workspace Preparation

```sh
  # Installs workspace and child repository packages for all repository projects
  make init
```

### Useful commands

```sh
  # Re-Export keycloak realm configuration, including keys, secrets, clients and more.
  # The config will be placed inside .config folder and is to be committed.

  # !!!
  # Be ware to not use any personal, sensitive data in
  # your keycloak test instance before exporting
  # !!!

  make exportkc
```

### Build

```sh
  make build
```

### Run

```sh
# Start thirdparty tools like reverse proxy, idp and db
make start
```

### Tests and Code Analysis

```sh
make test
```

## Other Information

### VSCode

- ❗ This project comes with a preconfigured `launch.json`, meaning hitting `F5` would start the API in debug mode!

This project makes use of the following extensions:

- **Java Tools**

  Name: Extension Pack for Java

  Id: vscjava.vscode-java-pack

  Description: Popular extensions for
  Java development that provides Java
  IntelliSense, debugging, testing, Maven/Gradle support, project management and more

  Version: 0.25.9

  Publisher: Microsoft

  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack

- **Java Debugging**

  Name: Debugger for Java

  Id: vscjava.vscode-java-debug

  Description: A lightweight Java debugger for Visual Studio Code

  Version: 0.49.0

  Publisher: Microsoft

  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug

- **REST API Testing**

  -> ▶️ Thunder Client API Test Configs are also committed with this repository and available as soon as you pull them.

  Name: Thunder Client

  Id: rangav.vscode-thunder-client

  Description: Lightweight Rest API
  Client for VS Code

  Version: 2.5.1

  Publisher: Ranga Vadhineni

  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client