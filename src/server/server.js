const { router } = require('../router.js');
const { startServer } = require('./startServer.js');
const { GuestBook } = require('../app/guestBook.js');

const guestBook = new GuestBook('./private/comments.json');
guestBook.initialize();

const main = (root) => {
  const port = 5555;
  startServer(port, router(root, guestBook));
};

main(...process.argv.slice(2));
