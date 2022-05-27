# Performance Management Application (PMA)

This [monorepo](https://danluu.com/monorepo/) contains the menagerie of
applications

This application requires `yarn v.1.22.x` and `node v.14.4.x`.

## Monorepo based on Lerna & Yarn Workspaces

- Lerna - https://github.com/lerna/lerna
- Workspaces - https://classic.yarnpkg.com/en/docs/workspaces

## Prerequisites

    -  Need to create .npmrc file on your PC and add needed configuration.
        For MAC: nano ~/.npmrc
        For Windows - navigate to C:\Users\<username> and create here .npmrc file.
    Fill this file with next data:
        //nexus.ourtesco.com/repository/colleague-ui/:_auth=<TOKEN>
        //nexus.ourtesco.com/repository/colleague-ui-private/:_auth=<TOKEN>
        //nexus.ourtesco.com/repository/online-web-group/:_auth=<TOKEN>
        always-auth=true
        https-proxy=http://10.251.0.42:80

    Your personal token you can found here - https://nexus.ourtesco.com/
    -  SET Proxy
        For MAC:
            export HTTP_PROXY=http://uk2.proxy.tesco.org:80
            export HTTPS_PROXY=http://uk2.proxy.tesco.org:80
        For Windows
            set HTTP_PROXY=http://uk2.proxy.tesco.org:80
            set HTTPS_PROXY=http://uk2.proxy.tesco.org:80

### 1. Install tools

- Yarn - https://yarnpkg.com

Check that Yarn is installed by running: `yarn --version`

- NodeJS - https://nodejs.org (version 14.18.3)

If some other version installed use NVM to install needed node version
-NVM - https://github.com/nvm-sh/nvm#installing-and-updating and for Windows https://github.com/coreybutler/nvm-windows/releases/tag/1.1.8

Check that NodeJS is installed by running: `node --version` or 'nvm ls'
To install and use 14.18.3 version of node - use commands:

- nvm install 14.18.3
- nvm use 14.18.3

### 2. Install dependencies

All projects are managed by Lerna with Yarn Workspaces. Before
starting any of the applications, do the following to ensure all
dependencies are satisfied.

1.  Ensure you are in the top level root directory.
2.  Install top level packages by running: `yarn bootstrap`

## Configuration

1. Client. [Check out](codebase/packages/client/README.md#L9) for details
2. Server. [Check out](codebase/packages/server/README.md#L3) for details

## Checklist for running the app locally

1. Set HTTP_PROXY and HTTPS_PROXY env vars to be able to bootstrap project

```
export HTTP_PROXY=http://10.251.0.42:80
export HTTPS_PROXY=http://10.251.0.42:80
```

2. Bootstrap project (download deps.)

```
   cd ./codebase
   yarn config set "strict-ssl" false -g
   yarn bootstrap
   yarn build:prod
```

3. Prepare configuration files

```
cd packages/server/
cp .env.example .env
```

open .env ## <- edit according to local env. [Check out](codebase/packages/client/README.md#L23) for details

```
cd packages/client/
cp .env.example .env
```

open .env ## <- edit according to local env. [Check out](codebase/packages/server/README.md#L25) for details

4. Start Application

```
yarn run:dev
```

## Available Scripts

Ensure you are in the top level root directory.

### Running project in development mode

- Run `yarn run:dev` to start development.

### Running project in production mode

- Run `yarn start:prod` to start development.

### Building project in production mode

- Run `yarn build:prod` to build.

### Bootstrap the packages in the repo. Installs all of their dependencies and links any cross-dependencies.

- Run `yarn bootstrap` to bootstrap.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.

## Packages

### server

The `server` is for production.

### client

The `client` is for UI part

## Work with packages

### Add dependency to package

- Run `yarn workspace @pma/server add [PACKAGE]` to add dependency to package `@pma/server`
- Run `yarn workspace @pma/client add [PACKAGE]` to add dependency to package `@pma/client`
