const fs = require('fs');

const contentTypes = {
  'jpg': 'image/jpg',
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'txt': 'text/plain',
  'pdf': 'application/pdf',
  'gif': 'image/gif'
};

const createFileHandler = (filePath = './public') => (request, response, next) => {
  const { url } = request;
  if (url.pathname === '/' && request.method === 'GET') {
    url.pathname = '/flower-catalog.html';
  }

  const fileName = filePath + url.pathname;

  if (!fs.existsSync(fileName)) {
    return next();
  }

  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);

  response.setHeader('content-type', contentTypes[fileExtension]);
  fs.readFile(fileName, (err, data) => {
    response.end(data);
  });
  return;
};

module.exports = { createFileHandler };
