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
  let { pathname } = request.url;
  if (pathname === '/' && request.method === 'GET') {
    pathname = '/index.html';
  }

  const fileName = filePath + pathname;

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
