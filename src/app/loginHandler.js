const createSession = (username, date) => {
  return {
    sessionId: date.getTime(),
    username,
    time: date.toLocaleString(),
  };
};

const loginHandler = (users) => (req, res, next) => {
  if (req.session) {
    res.end('successful');
    return;
  }

  const { username } = req.body;
  if (!username) {
    res.status(400).send('Please enter your username!');
    return;
  }

  if (!users[username]) {
    res.status(401).send('User does not exist!');
    return;
  }

  const newSession = createSession(username, req.rawDate);
  req.sessions[newSession.sessionId] = newSession;

  res.cookie('sessionId', newSession.sessionId);
  res.end('successful');
};

module.exports = { loginHandler };
