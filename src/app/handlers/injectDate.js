const injectDate = (req, res, next) => {
  const date = new Date();
  req.date = date.toLocaleString();
  req.rawDate = date;
  next();
};

module.exports = { injectDate };
