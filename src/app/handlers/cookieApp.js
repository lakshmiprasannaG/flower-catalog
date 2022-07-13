const injectSession = (sessions) => (req, res, next) => {
  if (req.cookies) {
    req.sessions = sessions;
  }
  next();
};

const createSession = (username, date) => {
  const sessionId = date.getTime();

  return {
    sessionId,
    username,
    time: date.toLocaleString(),
  };
};

module.exports = { injectSession, createSession };
