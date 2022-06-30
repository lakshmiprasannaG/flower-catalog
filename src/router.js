const { logHandler } = require('./app/handlers/logHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { createGuestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');

const handle = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

const router = (root, guestBook) => {
  const handlers = [
    logHandler,
    createGuestBookHandler(guestBook),
    createFileHandler(root),
    notFoundHandler
  ];

  return handle(handlers);
};

module.exports = { router };
