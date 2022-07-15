const createSession = (username, date) => {
  return {
    sessionId: date.getTime(),
    username,
    time: date.toLocaleString(),
  };
};

const loginHandler = (req, res, next) => {
  if (req.session) {
    res.redirect('/guest-book');
    return;
  }

  const { username } = req.body;
  if (!username) {
    res.status(400).send('Bad Request');
    return;
  }
  const newSession = createSession(username, req.rawDate);
  req.sessions[newSession.sessionId] = newSession;

  res.cookie('sessionId', newSession.sessionId);
  res.redirect('/guest-book');
};

module.exports = { loginHandler };
