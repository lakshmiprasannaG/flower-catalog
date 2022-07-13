const { router } = require('./app/router.js');

const { bodyParser, searchParamsParser, parseUrl } = require('./app/handlers/parser.js');
const { logHandler } = require('./app/handlers/logHandler.js');
const { injectSession } = require('./app/handlers/cookieApp.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { createGuestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');
const { logout } = require('./app/handlers/logout.js');
const { injectDate } = require('./app/handlers/injectDate.js');

const initializeApp = (staticSrcPath, { guestBook, sessions }) => {
  const handlers = [
    injectDate,
    parseUrl,
    // logHandler(console.log, sessions),
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

const app = (config, { guestBook, sessions }) => {
  const handlers = [
    injectDate,
    parseUrl,
    logHandler(console.log, sessions),
    bodyParser,
    searchParamsParser,
    injectCookies,
    injectSession(sessions),
    loginHandler(sessions),
    createFileHandler(config['FC_STATIC_SRC_PATH']),
    createGuestBookHandler(guestBook),
    logout,
    notFoundHandler
  ];
  return router(handlers);
};

module.exports = { app, initializeApp };
