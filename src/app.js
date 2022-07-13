const { router } = require('./app/router.js');

const { bodyParser, searchParamsParser, parseUrl } = require('./app/handlers/parser.js');
const { logHandler } = require('./app/handlers/logHandler.js');
const { injectGuestBook } = require('./app/handlers/injectGuestBook.js');
const { injectSession } = require('./app/handlers/sessionLib.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { guestBookHandler } = require('./app/handlers/guestBookHandler.js');
const { createFileHandler } = require('./app/handlers/staticFileHandler.js');
const { notFoundHandler } = require('./app/handlers/notFoundHandler.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');
const { logout } = require('./app/handlers/logout.js');
const { injectDate } = require('./app/handlers/injectDate.js');

const app = (config, { sessions }) => {
  const handlers = [
    injectDate,
    parseUrl,
    injectGuestBook(config['FC_GUESTBOOK_SRC_PATH']),
    logHandler(console.log, sessions),
    bodyParser,
    searchParamsParser,
    injectCookies,
    injectSession(sessions),
    loginHandler,
    createFileHandler(config['FC_STATIC_SRC_PATH']),
    guestBookHandler,
    logout,
    notFoundHandler
  ];
  return router(handlers);
};

module.exports = { app };
