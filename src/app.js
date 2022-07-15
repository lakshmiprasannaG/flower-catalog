const express = require('express');

const { injectGuestBook } = require('./app/handlers/injectGuestBook.js');
const { injectSession } = require('./app/handlers/sessionLib.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { addGuest, createGuestBook } = require('./app/handlers/guestBookHandler.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');
const { logout } = require('./app/handlers/logout.js');
const { injectDate } = require('./app/handlers/injectDate.js');

const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const startApp = (config, { sessions }) => {
  const app = express();
  app.use(injectDate);
  // app.use(logRequest);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectGuestBook(config.FC_GUESTBOOK_SRC_PATH));
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.get('/login', (req, res, next) => {
    if (req.session) {
      res.redirect('/guest-book');
      return;
    }
    res.redirect('/login.html');
    return;
  });
  app.post('/login', loginHandler);
  app.post('/add-guest', addGuest);

  app.get('/api/comments', (req, res, next) => {
    res.json(req.guestBook.guests);
    return;
  });

  app.get('/guest-book', (req, res, next) => {
    if (!req.session) {
      res.redirect('/login.html');
      return;
    }
    createGuestBook(req, res, next);
  });

  app.use(express.static('public'));

  app.post('/logout', logout)

  return app;
};

module.exports = { startApp };
