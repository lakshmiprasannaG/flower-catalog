const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.end('Not available');
  return true;
};

module.exports = { notFoundHandler };
