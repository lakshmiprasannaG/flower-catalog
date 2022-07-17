const request = require('supertest');
const { initApp } = require('./../src/app.js');

const config = {
  FC_STATIC_SRC_PATH: './public',
  FC_GUESTBOOK_SRC_PATH: './test/data/comments.json',
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

describe('signup', () => {

  describe('post /signup', () => {

    it('should add new user to users', (done) => {
      const newUsersList = {
        'lucky': {
          username: 'lucky'
        },
        'sunny': {
          username: 'sunny'
        },
        'lakshmi': {
          username: 'lakshmi'
        }
      };

      request(initApp(config, { users: users() }))
        .post('/signup')
        .send('username=lakshmi')
        .expect(newUsersList)
        .expect(200, done)
    });

    it('should return with 400 when username is not given', (done) => {
      request(initApp(config, { users: users() }))
        .post('/signup')
        .expect('Please enter your username!')
        .expect(400, done)
    });

    it('should not add user to users, when username is not available', (done) => {
      request(initApp(config, { users: users() }))
        .post('/signup')
        .send('username=sunny')
        .expect('Username already exists!')
        .expect(409, done)
    });
  });
});
