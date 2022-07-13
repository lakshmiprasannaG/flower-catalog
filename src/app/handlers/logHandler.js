const logHandler = (logger, sessions) => (request, response, next) => {
  logger('sessions:', sessions);
  logger(request.method);
  logger(request.date, request.url);
  next();
  return;
};

module.exports = { logHandler };
