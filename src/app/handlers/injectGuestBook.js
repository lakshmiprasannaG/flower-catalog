const { GuestBook } = require('./../guestBook.js');

const injectGuestBook = (guestBookSrcPath = './data/comments.json') => {
  const guestBook = new GuestBook(guestBookSrcPath);
  guestBook.initialize();

  return (req, res, next) => {
    const { pathname } = req.url;
    paths = ['/guest-book', '/add-guest', '/api/comments'];

    if (paths.includes(pathname)) {
      req.guestBook = guestBook;
    }
    next();
  };
};

module.exports = { injectGuestBook };
