const { app } = require('./../src/app.js');
const request = require('supertest');

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './data/comments.json'
};

describe('get /', () => {
  it('should respond with status code 200 & "html" content-type', (done) => {
    request(app(config))
      .get('/')
      .expect('content-type', /html/)
      .expect(200, done)
  });

});

describe('get /abc', () => {
  it('should return with status code 404 & "Not avaliable" message', (done) => {
    request(app(config))
      .get('/abc')
      .expect('Not available')
      .expect(404, done)
  });
});

describe('get /do-login', () => {
  it('should return with status code 200 and login template', (done) => {
    request(app(config))
      .get('/do-login')
      .expect('content-type', /html/)
      .expect(200, done)
  });
});

describe('post /login', () => {
  it('should return with status code 400 and msg when username is not given', (done) => {
    request(app(config))
      .post('/login')
      .expect('Please enter your username')
      .expect(400, done)
  });

  it('should return with status code 302 & location "guest-book" when username is given', (done) => {
    request(app(config))
      .post('/login')
      .send('username=lucky')
      .expect('location', '/guest-book')
      .expect(302, done)
  });

  it('should create session when session is not present for the given user',
    (done) => {
      request(app(config))
        .post('/login')
        .send('username=lucky')
        .expect('set-cookie', /sessionId=/, done)
    });
});

describe('get /guest-book', () => {
  it('should redirect to login page, when session is not present', (done) => {
    request(app(config))
      .get('/guest-book')
      .expect('location', 'do-login', done)
  });

  it.only('should accept comments when user session is present', () => {
    request(app(config))
      .post('/guest-book')
      .send('comment=checking')
  });
});
