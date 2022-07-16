const createSession = (username, date) => {
  return {
    sessionId: date.getTime(),
    username,
    time: date.toLocaleString(),
  };
};

const loginHandler = (req, res, next) => {
  if (req.session) {
    // res.redirect('/guest-book');
    res.end('successful');
    return;
  }

  const { username } = req.body;
  if (!username) {
    res.status(400).send('Please enter your username!');
    return;
  }

  const newSession = createSession(username, req.rawDate);
  req.sessions[newSession.sessionId] = newSession;

  res.cookie('sessionId', newSession.sessionId);
  // res.redirect('/guest-book');
  res.end('successful');
};

module.exports = { loginHandler };
