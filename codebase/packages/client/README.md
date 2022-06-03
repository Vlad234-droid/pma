# Diversity & Inclusion App (@dni/client)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

| Column                      | Description                                            | Value (one of)          | Optional | Suggestion                   |
| --------------------------- | ------------------------------------------------------ | ----------------------- | -------- | ---------------------------- |
| PORT                        | Specifies the port, which will be used for development | 9000                    | Y        | 9000                         |
| NODE_ENV                    | Env where the app is running                           | development, production | N        | development                  |
| PUBLIC_URL                  | For subdirectory                                       | /                       | N        | /                            |
| REACT_APP_LOGOUT_URL        | Path for logout                                        | /sso/logout             | N        | /sso/logout                  |
| REACT_APP_API_URL           | URL for api server                                     | [Local URL]             | N        | http://localhost:9000/api/v1 |
| REACT_APP_MY_INBOX_API_PATH | API path to integrate with Inbox                       | /api/colleague-inbox    | N        | /api/colleague-inbox         |
| REACT_APP_INTEGRATION_MODE  | Integration Mode                                       | standalone, integrity   | N        | standalone                   |

## Available Scripts

In the project directory, you can run:

### `yarn run:dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Cleanup.

- Run `yarn clean` to remove build artifact in packages.
- Run `yarn clean:all` to remove build artifacts and dependencies in packages and at the root level.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn run extract`

Run this function to generate translation json file for local or dev env.

**Note: not work for production. For prod version better move translation to CDN**

#### Date format for translation

Currently, we use `luxon` for date formatting.
Example how to add pattern for translation in json file or other place:

```
{
    "personal_development_plan_date": "Added {{date, d LLL yyyy}}"
}
```

Example in code:

```
t('personal_development_plan_date', 'Added 04 Apr 2021', { date: new Date(2021, 4, 4) })
```

You can find more date format examples in doc [luxon](https://moment.github.io/luxon/#/formatting?id=tolocalestring-strings-for-humans)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
