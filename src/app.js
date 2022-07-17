const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const handlers = require('./app/handlers.js');
const { loginHandler } = require('./app/loginHandler.js');
const { signupHandler } = require('./app/signupHandler.js');
const { addGuest } = require('./app/guestsHandler.js');
const { injectCookies } = require('./app/injectCookie.js');

const { injectGuestBook, comments, guestBookHandler, login, injectSession, injectDate, logout } = handlers;

const createLoginRouter = (users) => {
  const loginRouter = express.Router();
  loginRouter.get('/', login);
  loginRouter.post('/', loginHandler(users));

  return loginRouter;
};

const createGuestBookRouter = () => {
  const guestBookRouter = express.Router();
  guestBookRouter.post('/add-guest', addGuest);
  guestBookRouter.get('/api/comments', (req, res, next) => {
    comments(req, res, next);
  });
  guestBookRouter.get('/', guestBookHandler);

  return guestBookRouter;
}

const initApp = (config, { sessions, users }) => {
  const { FC_GUESTBOOK_SRC_PATH, FC_USERS_SRC_PATH } = config;
  // const users = JSON.parse(fs.readFileSync(FC_USERS_SRC_PATH, 'utf8'));

  const app = express();

  const loginRouter = createLoginRouter;
  const guestBookRouter = createGuestBookRouter();

  const middleware = [
    injectDate,
    morgan('tiny'),
    express.urlencoded({ extended: true }),
    injectGuestBook(FC_GUESTBOOK_SRC_PATH),
    injectCookies,
    injectSession(sessions)
  ];

  app.use(middleware);

  app.use('/login', loginRouter(users));
  app.post('/signup', signupHandler(users));

  app.use('/guest-book', guestBookRouter);

  app.use(express.static('public'));
  app.post('/logout', logout)


  return app;
};

module.exports = { initApp };
