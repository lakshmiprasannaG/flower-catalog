const logout = (req, res, next) => {
  if (req.url.pathname !== '/logout') {
    next();
    return;
  }

  const sessionId = req.cookies.sessionId;
  res.setHeader('set-cookie', `sessionId=${sessionId}; Max-Age=0`);
  delete req.sessions[sessionId];

  res.statusCode = '302';
  res.setHeader('Location', 'flower-catalog.html');
  res.end();
};

module.exports = { logout };
