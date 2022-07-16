const { loginHandler } = require('./loginHandler.js');
const { addGuest } = require('./guestsHandler.js');

const { comments, guestBookHandler, login } = require('./handlers.js');

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

module.exports = { createLoginRouter, createGuestBookRouter };
