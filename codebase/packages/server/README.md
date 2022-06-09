# Diversity & Inclusion App (@dni/server)

## Prerequisites

Follow the [instructions](../../../README.md#L13) of the root project

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

## Environment Table

| Column | Description | Value (one of) | Optional | Suggestion |
| ------ | ----------- | -------------- | -------- | ---------- |
| NODE_PORT | Port on which the server app is running | 9000 | Y | 9000 |
| NODE_ENV | Env where the app is running | local, dev, ppe, prod, | N | ppe |
| BUILD_ENV | Env on which the app is built | development, ppe, production | N | ppe |
| RUNTIME_ENV | Env where the app is running | local, dev, ppe, prod, | N | ppe |
| API_SERVER_URL | URL of API server | [remote URL] | N | - |
| SWAGGER_SERVER_URL | URL of Swagger server | [remote URL] | N | - |
| CAMUNDA_SERVER_URL | URL of Camunda server | [remote URL] | N | - |
| INTEGRATION_MODE | Integration Mode | standalone, integrity | N | standalone |
| INTEGRATION_CORE_MOUNT_PATH | Path to integrate with a third party app | / | N | / |
| INTEGRATION_CORE_URL | URL to integrate with a third party app | / | N | / |
| INTEGRATION_MOUNT_PATH | Mount Path to integrate with a third party app | / | N | / |
| INTEGRATION_NODE_BFF_URL | BFF URL to integrate with a third party app | / | N | / |
| APPLICATION_URL | Application public url | [remote URL] | N | http://localhost:9000/experience/yourcontribution |
| APPLICATION_USER_DATA_COOKIE_NAME | Application user cookie name | [cookie name] | N | user_data_cookie_name |
| APPLICATION_USER_DATA_COOKIE_SECRET | Application user cookie secret | [cookie secret] | N | user_data_cookie_secret |
| APPLICATION_COOKIE_PARSER_SECRET | Application parser cookie secret | [cookie secret] | N | cookie_parser_secret |
| STICK_COOKIES_TO_APPLICATION_PATH | Allows you to bind cookies to the application | false, true | N | false |
| USE_ONELOGIN | Allows you to use onelogin | false, true | N | true |
| OIDC_ISSUER_URL | Issuer url | [issuer url] | N | https://loginppe.ourtesco.com/oidc/2 |
| OIDC_AUTH_CALLBACK_PATH | A callback path that was registered for the app | [callback path] | N | /sso/auth/callback |
| OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH | Path that we will redirect to after logout | [redirect url or path] | N | /sso/logout/callback |
| OIDC_CLIENT_ID | The OneLogin generated Client ID for app | [secret] | N | - |
| OIDC_CLIENT_SECRET | The OneLogin generated Client Secret for app | [secret] | N | - |
| IDENTITY_CLIENT_ID | The Identity generated Client ID for app | [secret] | N | - |
| IDENTITY_CLIENT_SECRET | The Identity generated Client Secret for app | [secret] | N | - |
| IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME | The Identity cookie name | [cookie name] | N | identity_user_scoped_token_cookie_name |
| IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET | The Identity cookie secret | [cookie secret] | N | identity_cookie_secret |
| SPLUNK_TOKEN | The token for splunk | [secret] | Y | - |
| LOGGER_PRETIFY | Option to enable log formatting | false, true | Y | true |

## Available Scripts

In the project directory, you can run:

### `yarn run:dev`

Runs the app in the development mode.

### `yarn build`

Builds the app for production to the `build` folder.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.
