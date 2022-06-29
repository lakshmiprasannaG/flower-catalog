const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    request.url = new URL(request.url, 'http://' + request.headers.host);
    handler(request, response);
  });

  server.listen(port, () => {
    console.log(`Connection to ${port} created succesfully`);
  });
};

module.exports = { startServer };
