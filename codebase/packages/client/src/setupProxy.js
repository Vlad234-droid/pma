// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/auth', '/sso', '/my-inbox'], {
      target: 'http://localhost:4000',
      changeOrigin: true,
    }),
  );
};
