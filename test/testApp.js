const assert = require('assert');

const { startApp } = require('./../src/app.js');
const request = require('supertest');
const { GuestBook } = require('../src/app/guestBook.js');

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './test/data/comments.json'
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
    it('should respond with status code 200 & "html" content-type', (done) => {
      request(startApp({}, { sessions }))
        .get('/index.html')
        .expect('content-type', /html/)
        .expect(/<a href="abeliophyllum.html">/)
        .expect(/<a href="ageratum.html">/)
        .expect(/<a href="do-login">Guest book/)
        .expect(200, done)
    });

  });

  describe('get /invalid', () => {
    it('should return with status code 404 & "Not avaliable" message', (done) => {
      request(startApp({}, { sessions }))
        .get('/abc')
        .expect(404, done)
    });
  });

  describe('get /do-login.html', () => {
    it('should return with status code 200 and login template', (done) => {
      request(startApp({}, { sessions }))
        .get('/do-login.html')
        .expect(/<input type="text" name="username">/)
        .expect(/<input type="submit" value="Login">/)
        .expect('content-type', /html/)
        .expect(200, done)
    });
  });

  describe('post /login', () => {
    it('should return with status code 400 and msg when username is not given', (done) => {
      request(startApp({}, { sessions }))
        .post('/login')
        .expect('Bad Request')
        .expect(400, done)
    });

    it('should return with status code 302 & location "guest-book" when username is given', (done) => {
      request(startApp({}, { sessions }))
        .post('/login')
        .send('username=lucky')
        .expect(302, done)
    });

    it('should create session when session is not present for the given user',
      (done) => {
        request(startApp({}, { sessions }))
          .post('/login')
          .send('username=lucky')
          .expect('set-cookie', /sessionId=/, done)
      });
  });

  describe('get /guest-book', () => {
    it('should redirect to login page, when session/cookie is not present', (done) => {
      request(startApp({}, { sessions }))
        .get('/guest-book')
        .expect('location', '/do-login.html')
        .expect(302, done)
    });

    it('should open guest-book when user session is present', (done) => {
      request(startApp({}, { sessions }))
        .get('/guest-book')
        .set('Cookie', 'sessionId=123')
        .expect(/input type="button" value="Submit" onclick="guestBook/)
        .expect(200, done)
    });
  });

  describe('post /add-guest', () => {
    it('should add the comment when session is available', (done) => {
      request(startApp({}, { sessions }))
        .post('/add-guest')
        .set('Cookie', 'sessionId=123')
        .send('comment=hello')
        .expect(200, done)
      // .end((err, res) => {
      //   const expectedComment = { comment: 'hello', name: 'Abc' };
      //   const firstGuest = guestBook.guests[0];
      //   assert.deepStrictEqual(firstGuest.comment, expectedComment.comment);
      //   assert.deepStrictEqual(firstGuest.name, expectedComment.name);
      //   done();
      // })
    });
  });

  describe('post /logout', () => {
    const sessions = {
      123: {
        sessionId: 123,
        username: 'Abc',
      }
    };

    it('should redirect the user to home page when session is removed', (done) => {
      request(startApp({}, { sessions }))
        .post('/logout')
        .set('Cookie', 'sessionId=123')
        .expect(302, done)
    });
  });
});
