const logHandler = (logger, sessions) => (request, response, next) => {
  logger(sessions);
  logger(request.method);
  logger(request.date, request.url.href);
  next();
  return;
};

module.exports = { logHandler };
