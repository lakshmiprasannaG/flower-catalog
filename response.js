const CRLF = '\r\n';

const statusMessages = {
  200: 'OK',
  404: 'NOT FOUND',
  301: 'PERMANENT REDIRECTION',
  302: 'TEMPORARY REDIRECTION'
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  setHeader(field, value) {
    this.#headers[field] = value;
  }

  get statusCode() {
    return this.#statusCode;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #write(content) {
    this.#socket.write(content);
  }

  #end() {
    this.#socket.end();
  }

  #statusLine() {
    const httpVersion = 'HTTP/1.1';
    const statusMessage = statusMessages[this.#statusCode];
    return `${httpVersion} ${this.#statusCode} ${statusMessage}${CRLF}`;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([name, value]) => {
      this.#write(`${name}:${value}${CRLF}`);
    });
  }

  send(content) {
    this.setHeader('content-length', content.length);

    this.#write(this.#statusLine());
    this.#writeHeaders();
    this.#write(CRLF);
    this.#write(content);
    this.#end();
  }
}

module.exports = { Response };
