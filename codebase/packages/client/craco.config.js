// eslint-disable-next-line @typescript-eslint/no-var-requires
const singleSpaApplicationPlugin = require('./single-spa-plugin');

module.exports = {
  plugins: [
    {
      plugin: singleSpaApplicationPlugin,
      options: {
        orgName: "tesco",
        projectName: "pma",
        entry: "src/tesco-pma", //defaults to src/index.js,
        orgPackagesAsExternal: false, // defaults to false. marks packages that has @my-org prefix as external so they are not included in the bundle
        reactPackagesAsExternal: false, // defaults to true. marks react and react-dom as external so they are not included in the bundle
        externals: [/^@tesco\//, 'react', 'react-dom'], // defaults to []. marks the specified modules as external so they are not included in the bundle
        minimize: false // defaults to false, sets optimization.minimize value
      },
    }
  ]
}