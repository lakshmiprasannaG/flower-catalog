const logout = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  res.clearCookie({ sessionID: sessionId });
  delete req.sessions[sessionId];

  res.redirect('/');
};

module.exports = { logout };
