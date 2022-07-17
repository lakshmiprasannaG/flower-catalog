const { initApp } = require('./../src/app.js');
const request = require('supertest');

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './test/data/comments.json',
};

const sessions = () => {
  return {
    123: {
      sessionId: 123,
      username: 'sunny',
    }
  }
};

const users = () => {
  return {
    'lucky': {
      username: 'lucky'
    },
    'sunny': {
      username: 'sunny'
    }
  }
};

describe('login', () => {

  describe('get /login', () => {
    it('should return with 200 when session is already present', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/login')
        .send('username=lucky')
        .expect(302, done)
    });

    it('should give login page', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .get('/login.html')
        .expect(/<input type="text" name="username">/)
        .expect(/<input type="button" value="Login" onclick="login/)
        .expect('content-type', /html/)
        .expect(200, done)
    });
  });

  describe('post /login', () => {
    it('should return with 200 when session is already present', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .post('/login')
        .send('username=lucky')
        .expect('successful')
        .expect(200, done)
    });
    it('should return with 400 when username is not given', (done) => {
      request(initApp(config, { sessions: sessions(), users: users() }))
        .post('/login')
        .expect('Please enter your username!')
        .expect(400, done)
    });

    it('should return with 401 when unauthorized user tries to login',
      (done) => {
        request(initApp(config, { sessions: sessions(), users: users() }))
          .post('/login')
          .send('username=abc')
          .expect('User does not exist!')
          .expect(401, done)
      });

    it('should create session for new authorized user and give guest-book',
      (done) => {
        request(initApp(config, { sessions: sessions(), users: users() }))
          .post('/login')
          .send('username=lucky')
          .expect('set-cookie', /sessionId=/)
          .expect(200, done)
      });
  });
});

