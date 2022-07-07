const { createSession } = require('./cookieApp.js');

const loginHandler = (sessions) => (req, res, next) => {
  console.log(sessions);
  const pathname = req.url.pathname;
  if (pathname !== '/login' && pathname !== '/do-login') {
    next();
    return;
  }

  const currentUsername = req.bodyParams.username;

  const currentSession = sessions[req.cookies.sessionId];
  if (currentSession) {
    return redirectToGuestBook(req, res, next);
  }

  if (req.url.pathname === '/do-login') {
    res.end(`<html>

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
    
    </html>`);
    return;
  }

  if (!currentUsername) {
    res.end('Please enter your username');
    return;
  }

  const session = createSession(currentUsername);
  sessions[session.sessionId] = session;

  res.setHeader('set-cookie', `sessionId=${session.sessionId}`);
  return redirectToGuestBook(req, res, next);
};

const redirectToGuestBook = (req, res, next) => {
  res.statusCode = '302';
  res.setHeader('Location', '/guest-book');
  res.end();
};

module.exports = { loginHandler };
