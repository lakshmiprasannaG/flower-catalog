const fs = require('fs');

const readFile = (fileName) =>
  JSON.parse(fs.readFileSync(fileName, 'utf8'));

const writeToFile = (fileName, content) =>
  fs.writeFileSync(fileName, JSON.stringify(content), 'utf8');

class GuestBook {
  #guestBook
  #guestBookPath

  constructor(guestBookPath) {
    this.#guestBookPath = guestBookPath;
    this.#guestBook = [];
  }

  initialize() {
    this.#guestBook = readFile(this.#guestBookPath);
  }

  #writeGuests() {
    writeToFile(this.#guestBookPath, this.#guestBook);
  }

  addGuest(guest) {
    this.#guestBook.unshift(guest);
    this.#writeGuests();
  }

  get guests() {
    return this.#guestBook;
  }
}

module.exports = { GuestBook };
