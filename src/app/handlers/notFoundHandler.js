const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end('Not available');
  return true;
};

module.exports = { notFoundHandler };
