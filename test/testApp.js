const assert = require('assert');

const { startApp } = require('./../src/app.js');
const request = require('supertest');
const { GuestBook } = require('../src/app/guestBook.js');

const log = (req, res, next) => next;

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './test/data/comments.json',
  log
};

const guestBook = new GuestBook(config['FC_GUESTBOOK_SRC_PATH']);
guestBook.initialize();

const sessions = {
  123: {
    sessionId: 123,
    username: 'Abc',
  }
};

describe('app', () => {
  describe('get /', () => {
    it('should give index page', (done) => {
      request(startApp(config, { sessions }))
        .get('/index.html')
        .expect('content-type', /html/)
        .expect(/<a href="abeliophyllum.html">/)
        .expect(/<a href="ageratum.html">/)
        .expect(/<a href="login">Guest book/)
        .expect(200, done)
    });

  });

  describe('get /invalid', () => {
    it('should return with 404', (done) => {
      request(startApp(config, { sessions }))
        .get('/abc')
        .expect(404, done)
    });
  });

  describe('get /login', () => {
    it('should give login page', (done) => {
      request(startApp(config, { sessions }))
        .get('/login.html')
        .expect(/<input type="text" name="username">/)
        .expect(/<input type="submit" value="Login">/)
        .expect('content-type', /html/)
        .expect(200, done)
    });
  });

  describe('post /login', () => {
    it('should return with 400 when username is not given', (done) => {
      request(startApp(config, { sessions }))
        .post('/login')
        .expect('Bad Request')
        .expect(400, done)
    });

    it('should create session for new user and give guest-book',
      (done) => {
        request(startApp(config, { sessions }))
          .post('/login')
          .send('username=lucky')
          .expect('set-cookie', /sessionId=/)
          .expect(302, done)
      });
  });

  describe('get /guest-book', () => {
    it('should open login page, when user session is not present', (done) => {
      request(startApp(config, { sessions }))
        .get('/guest-book')
        .expect('location', '/login.html')
        .expect(302, done)
    });

    it('should open guest-book when user session is present', (done) => {
      request(startApp(config, { sessions }))
        .get('/guest-book')
        .set('Cookie', 'sessionId=123')
        .expect(/input type="button" value="Submit" onclick="guestBook/)
        .expect(200, done)
    });
  });

  describe('get /guest-book/api/comments', () => {
    it('should give comments', (done) => {
      request(startApp(config, { sessions }))
        .get('/guest-book/api/comments')
        .expect('content-type', /json/)
        .expect(200, done)
    });
  });

  describe('post /guest-book/add-guest', () => {
    it('should post the comment when session is available', (done) => {
      request(startApp(config, { sessions }))
        .post('/guest-book/add-guest')
        .set('Cookie', 'sessionId=123')
        .send('comment=hey')
        .expect(200)
        .end(() => {
          const expectedComment = { comment: 'hey', name: 'Abc' };
          const firstGuest = guestBook.guests[0];
          assert.deepStrictEqual(firstGuest.comment, expectedComment.comment);
          assert.deepStrictEqual(firstGuest.name, expectedComment.name);
          done();
        })
    });
  });

  describe('post /logout', () => {
    const sessions = {
      123: {
        sessionId: 123,
        username: 'Abc',
      }
    };

    it('should expire cookie and remove session of current user', (done) => {
      request(startApp(config, { sessions }))
        .post('/logout')
        .set('Cookie', 'sessionId=123')
        .expect(302, done)
    });
  });
});
