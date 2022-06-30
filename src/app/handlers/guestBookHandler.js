const fs = require('fs');

const createGuestBookPage = (guestBook) => {
  const guestBookTemplate = fs.readFileSync('./private/guestBookTemplate.html', 'utf8');

  const comments = [];

  guestBook.guests.forEach(({ date, name, comment }) => {
    comments.push(`${date} ${name} : ${comment}`);
  });

  return guestBookTemplate.replace('___COMMENT___', comments.join('<br>'));
};

const getQueryParams = searchParams => {
  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }
  queryParams.date = new Date().toLocaleString();
  return queryParams;
};

const createGuestBookHandler = (guestBook) => (request, response) => {
  const { url } = request;

  if (url.pathname === '/add-guest') {
    const queryParams = getQueryParams(url.searchParams);

    guestBook.addGuest(queryParams);

    response.statusCode = 302;
    response.setHeader('Location', '/guest-book');
    response.end('done');

    return true;
  }

  if (url.pathname === '/guest-book') {
    response.write(createGuestBookPage(guestBook));
    response.end('');

    return true;
  }
  return false;
};

module.exports = { createGuestBookHandler };
