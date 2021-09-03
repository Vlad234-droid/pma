# Diversity & Inclusion App (@dni/server)

## Prerequisites

Follow the [instructions](../../README.md#L13) of the root project

## Configuration for ENV (production/dev/stage)

Copy `.env.example` and rename to .env.[ENV] and configure correctly

```bash
$ cp .env.example .env.[ENV]
```

or

```bash
$ cp .env.example .env
```

where `[ENV] = production | dev | stage` and if missing it defaults to ''.

## Available Scripts

In the project directory, you can run:

### `yarn run:dev`

Runs the app in the development mode.

### `yarn build`

Builds the app for production to the `build` folder.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.
