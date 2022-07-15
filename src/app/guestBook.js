const fs = require('fs');

const readFile = (fileName) =>
  JSON.parse(fs.readFileSync(fileName, 'utf8'));

const writeToFile = (fileName, content) =>
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8');

class GuestBook {
  #comments
  #guestBookPath

  constructor(guestBookPath) {
    this.#guestBookPath = guestBookPath;
    this.#comments = [];
  }

  initialize() {
    this.#comments = readFile(this.#guestBookPath);
  }

  #writeComments() {
    writeToFile(this.#guestBookPath, this.#comments);
  }

  addGuest(guest) {
    this.#comments.unshift(guest);
    this.#writeComments();
  }

  get guests() {
    return this.#comments;
  }
}

module.exports = { GuestBook };
