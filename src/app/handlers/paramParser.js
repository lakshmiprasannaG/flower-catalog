const parseParams = (searchParams) => {
  const rawParams = new URLSearchParams(searchParams);
  const parsedParams = {};
  for (const [key, value] of rawParams.entries()) {
    parsedParams[key] = value;
  }
  return parsedParams;
};

const bodyParser = (req, res, next) => {
  let content = '';
  req.setEncoding('utf8');
  req.on('data', chunk => {
    content += chunk;
  });

  req.on('end', () => {
    req.rawBody = content;
    req.body = parseParams(content);
    next();
  });
  return;
};

const searchParamsParser = (req, res, next) => {
  req.queryParams = parseParams(req.url.searchParams);
  next();
};

const parseUrl = (req, res, next) => {
  req.url = new URL(req.url, 'http://' + req.headers.host);
  next();
};

module.exports = { bodyParser, searchParamsParser, parseUrl };
