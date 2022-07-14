const { injectGuestBook } = require('./app/handlers/injectGuestBook.js');
const { injectSession } = require('./app/handlers/sessionLib.js');
const { loginHandler } = require('./app/handlers/loginHandler.js');
const { guestBookHandler, addGuest, createGuestBook } = require('./app/handlers/guestBookHandler.js');
const { injectCookies } = require('./app/handlers/injectCookie.js');
const { logout } = require('./app/handlers/logout.js');
const { injectDate } = require('./app/handlers/injectDate.js');

const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

const startApp = (config, { sessions }) => {
  const express = require('express');
  const app = express();
  app.use(injectDate);
  // app.use(logRequest);
  app.use(injectGuestBook());
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.urlencoded({ extended: true }));
  app.post('/login', loginHandler);
  app.post('/add-guest', addGuest);

  app.get('/api/comments', (req, res, next) => {
    res.json(req.guestBook.guests);
    return;
  });

  app.get('/do-login', (req, res, next) => {
    if (req.session) {
      res.redirect('/guest-book');
      return;
    }
    res.redirect('/do-login.html');
    return;
  });

  app.get('/guest-book', (req, res, next) => {
    if (!req.session) {
      res.redirect('/do-login.html');
      return;
    }
    createGuestBook(req, res, next);
  });

  app.use(express.static('public'));

  app.post('/logout', logout)

  return app;
};

module.exports = { startApp };
