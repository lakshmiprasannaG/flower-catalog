const logHandler = (request, response, next) => {
  request.date = new Date().toLocaleString();
  console.log(request.method);
  console.log(request.date, request.url.href);
  next();
  return;
};

module.exports = { logHandler };
