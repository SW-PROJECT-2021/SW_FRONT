const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
      target: "http://15.164.20.183:3003",
      changeOrigin: true,
    })
  );
};
