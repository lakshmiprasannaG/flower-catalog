const { xhrApp, app } = require('./src/app.js');
const { startServer } = require('./src/server/startServer.js');

//const FC_PORT = 3333;
//const FC_STATIC_SRC_PATH = './public';
//const FC_GUESTBOOK_SRC_PATH = './private/comments.json';

const { FC_PORT, FC_STATIC_SRC_PATH, FC_GUESTBOOK_SRC_PATH } = process.env;

const main = () => {
  startServer(FC_PORT, app(FC_STATIC_SRC_PATH, FC_GUESTBOOK_SRC_PATH));
};

main(...process.argv.slice(2));
