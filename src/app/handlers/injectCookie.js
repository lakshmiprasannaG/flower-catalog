const parseCookies = (rawCookies) => {
  const cookies = {};

  rawCookies.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  let cookies = {};
  const rawCookies = req.headers.cookie;
  if (rawCookies) {
    cookies = parseCookies(rawCookies);
  }
  req.cookies = cookies;
  next();
};

module.exports = { injectCookies };
