const { GuestBook } = require('../guestBook.js');
const { createGuestBook } = require('./guestsHandler.js');

const injectDate = (req, res, next) => {
  const date = new Date();
  req.date = date.toLocaleString();
  req.rawDate = date;
  next();
};

const injectGuestBook = (guestBookSrcPath = './data/comments.json') => {
  const guestBook = new GuestBook(guestBookSrcPath);
  guestBook.initialize();

  return (req, res, next) => {
    req.guestBook = guestBook;
    next();
  };
};

const logRequest = (log) => (req, res, next) => {
  log(req.method, req.url);
  next();
};

const comments = (req, res, next) => {
  res.json(req.guestBook.guests);
  return;
};

const guestBookHandler = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login.html');
    return;
  }
  createGuestBook(req, res, next);
};

const redirectLogin = (req, res, next) => {
  if (!req.session) {
    res.redirect('/login.html');
    return;
  }
  res.redirect('/guest-book');
};

const injectSession = (sessions) => (req, res, next) => {
  req.sessions = sessions;
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    req.session = sessions[sessionId];
  }
  next();
};

const logout = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  res.clearCookie({ sessionID: sessionId });
  delete req.sessions[sessionId];

  res.redirect('/');
};

module.exports = {
  injectGuestBook, injectDate, injectSession, logRequest, comments, guestBookHandler, redirectLogin, logout
};
