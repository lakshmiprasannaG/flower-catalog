const injectSession = (sessions) => (req, res, next) => {
  req.sessions = sessions;
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    req.session = sessions[sessionId];
  }
  next();
};

const createSession = (username, date) => {
  return {
    sessionId: date.getTime(),
    username,
    time: date.toLocaleString(),
  };
};

module.exports = { injectSession, createSession };
