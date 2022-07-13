const { app } = require('./../src/app.js');
const request = require('supertest');

describe('createStaticFileHandler', () => {
  it('should respond with status code 200', (done) => {
    request(app('./public', './private/comments.json'))
      .get('/')
      .expect(200, done)
  });
});

describe('notFoundHandler', () => {
  it('should return with status code 404', (done) => {
    request(app('./a', './private/comments.json'))
      .get('/abc')
      .expect(404, done)
  });
  it('should return "Not available"', (done) => {
    request(app('./a', './private/comments.json'))
      .get('/abc')
      .expect('Not available', done)
  });
});
