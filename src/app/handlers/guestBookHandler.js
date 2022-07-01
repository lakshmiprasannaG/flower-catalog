const fs = require('fs');

const parseParams = searchParams => {
  const queryParams = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
};

const createGuestBookPage = (guestBook) => {
  const template = fs.readFileSync('./private/guestBookTemplate.html', 'utf8');

  const comments = [];
  guestBook.guests.forEach(({ date, name, comment }) => {
    comments.push(`${date} ${name} : ${comment}`);
  });

  return template.replace('___COMMENT___', comments.join('<br>'));
};

const createGuestBookHandler = (guestBook) => (request, response, next) => {
  const { url } = request;

  if (url.pathname === '/add-guest' && request.method === 'POST') {
    const parsedParams = parseParams(request.body);
    guestBook.addGuest({ ...parsedParams, date: request.date });

    response.statusCode = 302;
    response.setHeader('Location', '/guest-book');
    response.end('done');
    return;
  }

  if (url.pathname === '/guest-book' && request.method === 'GET') {
    response.write(createGuestBookPage(guestBook));
    response.end('');
    return;
  }
  return next();
};

module.exports = { createGuestBookHandler };
