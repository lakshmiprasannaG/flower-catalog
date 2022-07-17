const assert = require('assert');

const { initApp } = require('./../src/app.js');
const request = require('supertest');
const { GuestBook } = require('../src/guestBook.js');

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './test/data/comments.json',
};

const guestBook = new GuestBook(config['FC_GUESTBOOK_SRC_PATH']);
guestBook.initialize();

const sessions = () => {
  return {
    123: {
      sessionId: 123,
      username: 'sunny',
    }
  };
};

const users = () => {
  return {
    'lucky': {
      username: 'lucky'
    },
    'sunny': {
      username: 'sunny'
    }
  };
};

describe('app', () => {
  describe('get /', () => {
    it('should give index page', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
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
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/abc')
        .expect(404, done)
    });
  });

  describe('get /guest-book', () => {
    it('should open login page, when user session is not present', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/guest-book')
        .expect('location', '/login.html')
        .expect(302, done)
    });

    it('should open guest-book when user session is present', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/guest-book')
        .set('Cookie', 'sessionId=123')
        .expect(/input type="button" value="Submit" onclick="guestBook/)
        .expect(200, done)
    });
  });

  describe('get /guest-book/api/comments', () => {
    it('should give comments', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/guest-book/api/comments')
        .expect('content-type', /json/)
        .expect(200, done)
    });
  });

  describe('post /guest-book/add-guest', () => {
    it('should post the comment when session is available', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .post('/guest-book/add-guest')
        .set('Cookie', 'sessionId=123')
        .send('comment=hey')
        .expect(200)
        .end(() => {
          const expectedComment = { comment: 'hey', name: 'sunny' };
          const firstGuest = guestBook.guests[0];
          assert.deepStrictEqual(firstGuest.comment, expectedComment.comment);
          assert.deepStrictEqual(firstGuest.name, expectedComment.name);
          done();
        })
    });
  });

  describe('post /logout', () => {
    it('should expire cookie and remove session of current user', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .post('/logout')
        .set('Cookie', 'sessionId=123')
        .expect(302, done)
    });
  });
});
