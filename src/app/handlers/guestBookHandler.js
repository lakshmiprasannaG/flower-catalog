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
  fs.writeFileSync('./public/guest-book.html', guestBook, 'utf8');
};

const getQueryParams = searchParams => {
  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }
  queryParams.date = new Date().toLocaleString();
  return queryParams;
};

const guestBookHandler = (request, response) => {
  const { url } = request;

  if (url.pathname === '/comment') {
    const queryParams = getQueryParams(url.searchParams);

    addComment(queryParams);

    writeCommentsToGuestBook();

    response.statusCode = 302;
    response.setHeader('Location', '/guest-book.html');
    response.end('done');

    return true;
  }
  return false;
};

module.exports = { guestBookHandler };
