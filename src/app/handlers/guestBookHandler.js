const fs = require('fs');

const addGuest = (req, res, next) => {
  if (!req.session) {
    return;
  }
  res.set({ 'content-type': 'text' });

  const parsedParams = req.body;

  const newComment = {
    ...parsedParams,
    name: req.session.username,
    date: req.date
  };

  req.guestBook.addGuest(newComment);
  res.end();
};

const createGuestBook = (req, res, next) => {
  const template = fs.readFileSync('./templates/guestBookTemplate.html', 'utf8');
  const comments = convertToHtml(req.guestBook.guests);
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

const guestBookHandler = (req, res, next) => {
  const { pathname } = req.url;

  if (pathname === '/add-guest' && req.method === 'POST') {
    addGuest(req, res, next);
    return;
  }

  if (pathname === '/api/comments' && req.method === 'GET') {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(req.guestBook.guests));
    return;
  }

  if (pathname === '/guest-book' && req.method === 'GET') {
    if (!req.session) {
      res.redirect('/login');
      return;
    }
    createGuestBook(req, res, next);
    return;
  }
  return next();
};

module.exports = { guestBookHandler, addGuest, createGuestBook };
