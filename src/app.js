const { router } = require('./app/router.js');

const { bodyParser } = require('./app/handlers/bodyParser.js');
const { logHandler } = require('./app/handlers/logHandler.js');
const { createGuestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');
const { GuestBook } = require('./app/guestBook.js');

const app = (staticSrcPath, guestBookSrcPath) => {
  const guestBook = new GuestBook(guestBookSrcPath);
  guestBook.initialize();

  const handlers = [
    logHandler,
    bodyParser,
    createGuestBookHandler(guestBook),
    createFileHandler(staticSrcPath),
    notFoundHandler
  ];

  return router(handlers);
};

module.exports = { app };
