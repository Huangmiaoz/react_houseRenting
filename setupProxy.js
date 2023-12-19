const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/chats',
    createProxyMiddleware({
      target: 'http://localhost:18081',
      changeOrigin: true,
    })
  );
};
