const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/socket.io", {target: "http://localhost:3001", ws: true}))
};
