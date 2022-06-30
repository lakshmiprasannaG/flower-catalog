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

const createFileHandler = (filePath = './public') => (request, response) => {
  const { url } = request;
  if (url.pathname === '/') {
    url.pathname = '/flower-catalog.html';
  }

  const fileName = filePath + url.pathname;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);

  response.setHeader('content-type', contentTypes[fileExtension]);
  const content = fs.readFileSync(fileName);
  response.end(content);
  return true;
};

module.exports = { createFileHandler };
