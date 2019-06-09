const http = require('http');
const server = new http.Server();

// Listen
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

module.exports = server;
