const { app } = require('./src/app.js');
const { startServer } = require('./src/server/startServer.js');

const main = (root) => {
  const port = 5555;
  startServer(port, app(root));
};

main(...process.argv.slice(2));
