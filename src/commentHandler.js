const fs = require('fs');

const commentHandler = (request, response) => {
  const { uri, queryParams } = request;
  if (uri === '/comment') {
    const previousComments =
      JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    previousComments.unshift(queryParams);

    fs.writeFileSync('comments.json', JSON.stringify(previousComments), 'utf8');

    response.statusCode = 302;
    response.setHeader('Location', '/guestBook.html');
    response.send('done');

    return true;
  }
  return false;
};

module.exports = { commentHandler };
