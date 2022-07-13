const fs = require('fs');

const addGuest = (guestBook) => (req, res, next) => {
  const session = req.sessions[req.cookies.sessionId];
  if (!session) {
    return;
  }

  const parsedParams = req.body;
  const newComment = {
    ...parsedParams,
    name: session.username,
    date: req.date
  };

  guestBook.addGuest(newComment);
  res.end();
};

const createGuestBook = (guestBook) => (req, res, next) => {
  const template = fs.readFileSync('./templates/guestBookTemplate.html', 'utf8');
  const comments = convertToHtml(guestBook.guests);
  res.end(template.replace('___COMMENT___', comments));
};

const convertToHtml = (rawComments) => {
  const comments = [];
  rawComments.forEach(({ date, name, comment }) => {
    comments.push(`
    <tr>
    <td> ${date} </td>
    <td> ${name} </td>
    <td> ${comment} </td>
    </tr>`
    )
  });
  return comments.join('');
};

const createGuestBookHandler = (guestBook) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname === '/add-guest' && req.method === 'POST') {
    addGuest(guestBook)(req, res, next);
    return;
  }

  if (pathname === '/api/comments' && req.method === 'GET') {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(guestBook.guests));
    return;
  }

  if (pathname === '/guest-book' && req.method === 'GET') {
    if (!req.sessions[req.cookies.sessionId]) {
      res.statusCode = '302';
      res.setHeader('location', 'do-login');
      res.end('redirected to login page');
      return;
    }
    createGuestBook(guestBook)(req, res, next);
    return;
  }
  return next();
};

module.exports = { createGuestBookHandler };
