const bodyParser = (request, response, next) => {
  let content = '';
  request.setEncoding('utf8');
  request.on('data', chunk => {
    content += chunk;
  });

  request.on('end', () => {
    const bodyParams = new URLSearchParams(content);
    request.body = bodyParams;
    next();
  });
  return;
};

module.exports = { bodyParser };
