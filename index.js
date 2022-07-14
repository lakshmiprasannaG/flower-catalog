const { startApp } = require('./src/app.js');

const FC_PORT = 2345;

const app = startApp({}, {});
app.listen(FC_PORT);
