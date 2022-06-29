const fs = require('fs');

const allComments = () => JSON.parse(fs.readFileSync('./private/comments.json', 'utf8'));

const addComment = (newComment) => {
  const comments = allComments();
  comments.unshift(newComment);
  fs.writeFileSync('./private/comments.json', JSON.stringify(comments), 'utf8');
};

const writeCommentsToGuestBook = () => {
  const guestBookTemplate = fs.readFileSync('./private/guestBookTemplate.html', 'utf8');

  const comments = [];

  allComments().forEach(({ name, date, comment }) => {
    comments.push(`${date} ${name} : ${comment}`);
  });

  const guestBook = guestBookTemplate.replace('___COMMENT___', comments.join('<br>'));
  fs.writeFileSync('./public/guestBook.html', guestBook, 'utf8');
};

const commentHandler = (request, response) => {
  const { uri, queryParams } = request;
  if (uri === '/comment') {
    queryParams.date = new Date().toLocaleString();
    addComment(queryParams);

    writeCommentsToGuestBook();

    response.statusCode = 302;
    response.setHeader('Location', '/guestBook.html');
    response.send('done');

    return true;
  }
  return false;
};

module.exports = { commentHandler };
