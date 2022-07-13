const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    handler(request, response);
  });

  server.listen(port, () => {
    console.log(`Connection to ${port} created succesfully`);
  });
};

module.exports = { startServer };
