const { initApp } = require('./src/app.js');
const fs = require('fs');

const FC_PORT = 2345;
const FC_USERS_SRC_PATH = './data/users.json';

const config = {
  FC_GUESTBOOK_SRC_PATH: './data/comments.json',
  log: console.log
};

const sessions = {};
const users = JSON.parse(fs.readFileSync(FC_USERS_SRC_PATH, 'utf8'));

const app = initApp(config, { sessions, users });
app.listen(FC_PORT, () => console.log('Connected to port ', FC_PORT));
