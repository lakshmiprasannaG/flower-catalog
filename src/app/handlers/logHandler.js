const logHandler = (request, response) => {
  console.log(request.url);
  return false;
};

module.exports = { logHandler };
