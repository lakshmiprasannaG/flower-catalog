const { createServer } = require('net');
const { Response } = require('./response.js');
const { fileHandler } = require('./serveFileContents.js');
const { commentHandler } = require('./commentHandler.js');
const { notFoundHandler } = require('./notFoundHandler.js');
const { parseRequest } = require('./parser.js');

const handle = (handlers, filePath) => {
  return (request, response) => {
    for (let index = 0; index < handlers.length; index++) {
      if (handlers[index](request, response, filePath)) {
        return true;
      }
    }
  };
};

const onConnection = (socket, handler) => {
  socket.on('data', chunk => {
    socket.on('error', () => {
      console.log('error');
    });

    const request = parseRequest(chunk.toString());

    const response = new Response(socket);
    handler(request, response);
  });
};

const startServer = (port, handler) => {
  const server = createServer((socket) => onConnection(socket, handler));
  server.listen(port, () => {
    console.log(`Connection to ${port} created succesfully`);
  });
};

const main = (args) => {
  const handlers = [commentHandler, fileHandler, notFoundHandler];
  const port = 5555;
  startServer(port, handle(handlers, args));
};

main(...process.argv.slice(2));
