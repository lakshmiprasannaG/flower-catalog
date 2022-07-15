const express = require('express');

const { injectGuestBook, logRequest, comments, guestBookHandler, redirectLogin, injectSession, injectDate, logout } = require('./app/handlers/handlers.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { addGuest } = require('./app/handlers/guestsHandler.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');

const startApp = (config, { sessions }) => {
  const { log, FC_GUESTBOOK_SRC_PATH } = config;
  const app = express();

  app.use(injectDate);
  app.use(logRequest(log));
  app.use(express.urlencoded({ extended: true }));
  app.use(injectGuestBook(FC_GUESTBOOK_SRC_PATH));
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.get('/login', redirectLogin);
  app.post('/login', loginHandler);
  app.post('/add-guest', addGuest);
  app.get('/api/comments', comments);
  app.get('/guest-book', guestBookHandler);
  app.use(express.static('public'));
  app.post('/logout', logout)

  return app;
};

module.exports = { startApp };
