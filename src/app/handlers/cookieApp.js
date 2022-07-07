const injectSession = (sessions) => (req, res, next) => {
  if (req.cookies) {
    req.sessions = sessions;
  }
  next();
};

const createSession = (username) => {
  const time = new Date();
  const sessionId = time.getTime();

  return {
    sessionId,
    username,
    time: time.toLocaleString(),
  };
};

module.exports = { injectSession, createSession };
