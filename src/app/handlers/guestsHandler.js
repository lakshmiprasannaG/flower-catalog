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

module.exports = { addGuest, createGuestBook };
