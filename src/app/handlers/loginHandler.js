const { createSession } = require('./sessionLib.js');

const loginTemplate = () => `<html>

    <head>
      <title>LOGIN</title>
    </head>
    
    <body>
      <h1>Login</h1>
      <form action="/login" method="post">
        <div>
          <label for="username">Username: </label>
          <input type="text" name="username">
        </div>
        <div>
          <input type="submit" value="Login">
        </div>
      </form>
    
    </body>
    
    </html>`;

const redirectToGuestBook = (req, res, next) => {
  res.statusCode = '302';
  res.setHeader('Location', '/guest-book');
  res.end('welcome to guest book');
};

const loginHandler = (req, res, next) => {
  const pathname = req.url.pathname;
  if (pathname !== '/login' && pathname !== '/do-login') {
    next();
    return;
  }

  const currentUsername = req.body.username;

  if (req.session) {
    return redirectToGuestBook(req, res, next);
  }

  if (req.url.pathname === '/do-login') {
    res.setHeader('content-type', 'text/html');
    res.end(loginTemplate());
    return;
  }

  if (!currentUsername) {
    res.statusCode = 400;
    res.end('Please enter your username');
    return;
  }

  const newSession = createSession(currentUsername, req.rawDate);
  req.sessions[newSession.sessionId] = newSession; // injecting session to sessions

  res.setHeader('set-cookie', `sessionId=${newSession.sessionId}`);
  return redirectToGuestBook(req, res, next);
};

module.exports = { loginHandler };
