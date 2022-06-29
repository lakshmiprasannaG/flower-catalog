const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { guestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');

const handle = (handlers, filePath) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response, filePath)) {
        return true;
      }
    }
    return false;
  };
};

const app = (root) => {
  const handlers = [
    guestBookHandler,
    createFileHandler(root),
    notFoundHandler
  ];

  return handle(handlers);
};

module.exports = { app };
