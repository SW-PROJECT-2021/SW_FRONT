const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      createProxyMiddleware("/api", {
         target: "http://15.164.20.183:3003",
         changeOrigin: true,
      })
   );
};
