const parseHeader = line => {
  const indexOfColon = line.indexOf(':');
  const field = line.slice(0, indexOfColon);
  const value = line.slice(indexOfColon + 1).trim();
  return [field, value];
};

const parseHeaders = lines => {
  const headers = {};
  let index = 0;

  while (index < lines.length && lines[index].length > 0) {
    const [key, value] = parseHeader(lines[index]);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseQueryParams = (params) => {
  const queryParams = {};
  const paramStrings = params.split('&');

  paramStrings.forEach(paramString => {
    const [key, value] = paramString.split('=');
    queryParams[key] = value;
  });
  return queryParams;
};

const parseUri = (rawUri) => {
  let queryParams = {};
  const [uri, params] = rawUri.split('?');

  if (params) {
    queryParams = parseQueryParams(params);
  }
  return { uri, queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  return { method, ...parseUri(rawUri), httpVersion };
};

const parseRequest = (response) => {
  const lines = response.split('\r\n');
  const requestLine = parseRequestLine(lines[0].trim());
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest, parseRequestLine };
