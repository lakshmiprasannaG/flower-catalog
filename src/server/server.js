const { app } = require('../app.js');
const { startServer } = require('./startServer.js');

const main = (args) => {
  const port = 5555;
  startServer(port, app(args));
};

main(...process.argv.slice(2));
