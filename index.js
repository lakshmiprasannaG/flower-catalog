const { startApp } = require('./src/app.js');
const { log } = require('console');

const FC_PORT = 2345;
const config = {
  FC_GUESTBOOK_SRC_PATH: './data/comments.json',
  log: console.log
};

const app = startApp(config, { sessions: {} });
app.listen(FC_PORT, () => console.log('Connected to port ', FC_PORT));
