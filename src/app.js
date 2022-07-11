const { router } = require('./app/router.js');

const { bodyParser, searchParamsParser } = require('./app/handlers/paramParser.js');
const { logHandler } = require('./app/handlers/logHandler.js');
const { injectSession } = require('./app/handlers/cookieApp.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { createGuestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');
const { GuestBook } = require('./app/guestBook.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');
const { logout } = require('./app/handlers/logout.js');

const sessions = {};

const app = (staticSrcPath, guestBookSrcPath) => {
  const guestBook = new GuestBook(guestBookSrcPath);
  guestBook.initialize();

  const handlers = [
    logHandler,
    bodyParser,
    searchParamsParser,
    injectCookies,
    injectSession(sessions),
    loginHandler(sessions),
    createFileHandler(staticSrcPath),
    createGuestBookHandler(guestBook),
    logout,
    notFoundHandler
  ];

  return router(handlers);
};

const dataHandler = (req, res, next) => {
  console.log('in data handler');
  if (req.url.pathname === '/data') {
    const params = req.bodyParams;
    res.end(JSON.stringify(params));
    return;
  }
  next();
};

const xhrApp = (staticSrcPath) => {
  const handlers = [
    bodyParser,
    searchParamsParser,
    dataHandler,
    createFileHandler(staticSrcPath),
    notFoundHandler
  ];

  return router(handlers);
};

module.exports = { app, xhrApp };
