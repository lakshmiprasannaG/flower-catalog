const fs = require('fs');

// const parseParams = searchParams => {
//   const queryParams = {};
//   for (const [key, value] of searchParams.entries()) {
//     queryParams[key] = value;
//   }
//   return queryParams;
// };

const createGuestBookPage = (guestBook) => {
  const template = fs.readFileSync('./private/guestBookTemplate.html', 'utf8');

  const comments = [];
  guestBook.guests.forEach(({ date, name, comment }) => {
    comments.push(`${date} ${name} : ${comment}`);
  });

  return template.replace('___COMMENT___', comments.join('<br>'));
};

const addGuest = (guestBook) => (req, res, next) => {
  const session = req.sessions[req.cookies.sessionId];
  if (!session) {
    res.statusCode = '302';
    res.setHeader('Location', '/do-login');
    res.end('Please login');
    return;
  }

  const parsedParams = req.bodyParams;
  guestBook.addGuest(
    { ...parsedParams, name: session.username, date: req.date }
  );

  res.statusCode = 302;
  res.setHeader('Location', '/guest-book');
  res.end('done');
  return;
};

const createGuestBookHandler = (guestBook) => (req, res, next) => {
  const { url } = req;

  if (url.pathname === '/add-guest' && req.method === 'POST') {
    addGuest(guestBook)(req, res, next);
    return;
  }

  if (url.pathname === '/guest-book' && req.method === 'GET') {
    createGuestBook(guestBook)(req, res, next);
    return;
  }
  return next();
};

const createGuestBook = (guestBook) => (req, res, next) => {
  res.write(createGuestBookPage(guestBook));
  res.end();
  return;
}

module.exports = { createGuestBookHandler };
