const logHandler = (sessions) => (request, response, next) => {
  request.date = new Date().toLocaleString();
  console.log('sessions:', sessions);
  console.log(request.method);
  console.log(request.date, request.url);
  next();
  return;
};

module.exports = { logHandler };
