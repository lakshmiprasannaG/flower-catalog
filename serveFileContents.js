const fs = require('fs');

const contentTypes = {
  'jpg': 'image/jpg',
  'html': 'text/html',
  'js': 'text/javascript',
  'txt': 'text/plain'
};

const fileHandler = ({ uri }, response, filePath = './') => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = filePath + uri;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  response.setHeader('content-type', contentTypes[fileExtension]);
  const content = fs.readFileSync(fileName);
  response.send(content);
  return true;
};

module.exports = { fileHandler };
