const fs = require('fs');

const addGuest = (guestBook) => (req, res, next) => {
  const session = req.sessions[req.cookies.sessionId];
  if (!session) {
    alert('Please login before commenting');
    return;
  }

  const parsedParams = req.bodyParams;
  const newComment = { ...parsedParams, name: session.username, date: req.date };
  guestBook.addGuest(newComment);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestBook.guests));
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

  const template = fs.readFileSync('./private/guestBookTemplate.html', 'utf8');

  const comments = [];
  comments.push(`
  <th>
  <th> date </th>
  <th> name </th>
  <th> comment </th>
  </th>`
  );
  guestBook.guests.forEach(({ date, name, comment }) => {
    comments.push(`
    <tr>
    <td> ${date} </td>
    <td> ${name} </td>
    <td> ${comment} </td>
    </tr>`
    )
  });
  res.end(template.replace('___COMMENT___', comments.join('')));
  return;
};

module.exports = { createGuestBookHandler };
