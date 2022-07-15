const { GuestBook } = require('./../guestBook.js');

const injectGuestBook = (guestBookSrcPath = './data/comments.json') => {
  const guestBook = new GuestBook(guestBookSrcPath);
  guestBook.initialize();

  return (req, res, next) => {
    req.guestBook = guestBook;
    next();
  };
};

module.exports = { injectGuestBook };
