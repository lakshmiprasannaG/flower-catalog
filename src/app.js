const { router } = require('./app/router.js');

const { bodyParser } = require('./app/handlers/bodyParser.js');
const { logHandler } = require('./app/handlers/logHandler.js');
const { createGuestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');
const { GuestBook } = require('./app/guestBook.js');

const guestBook = new GuestBook('./private/comments.json');
guestBook.initialize();

const app = (root) => {
  const handlers = [
    logHandler,
    bodyParser,
    createGuestBookHandler(guestBook),
    createFileHandler(root),
    notFoundHandler
  ];

  return router(handlers);
};

module.exports = { app };
