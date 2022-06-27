const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.send('Not available');
  return true;
};
exports.notFoundHandler = notFoundHandler;
