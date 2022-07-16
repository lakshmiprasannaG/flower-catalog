const express = require('express');

const handlers = require('./app/handlers.js');
const { loginHandler } = require('./app/loginHandler.js');
const { signupHandler } = require('./app/signupHandler.js');
const { addGuest } = require('./app/guestsHandler.js');
const { injectCookies } = require('./app/injectCookie.js');

const { injectGuestBook, logRequest, comments, guestBookHandler, login, injectSession, injectDate, logout } = handlers;

const createLoginRouter = () => {
  const loginRouter = express.Router();
  loginRouter.get('/', login);
  loginRouter.post('/', loginHandler);

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

const initApp = (config, { sessions }) => {
  const { log, FC_GUESTBOOK_SRC_PATH } = config;
  const app = express();

  const loginRouter = createLoginRouter();
  const guestBookRouter = createGuestBookRouter();

  const middleware = [
    injectDate,
    logRequest(log),
    express.urlencoded({ extended: true }),
    injectGuestBook(FC_GUESTBOOK_SRC_PATH),
    injectCookies,
    injectSession(sessions)
  ];

  app.use(middleware);
  app.use('/login', loginRouter);
  app.use('/guest-book', guestBookRouter);

  app.use(express.static('public'));
  app.post('/logout', logout)

  app.post('/signup', signupHandler);

  return app;
};

module.exports = { initApp };
