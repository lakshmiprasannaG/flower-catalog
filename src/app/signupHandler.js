const fs = require('fs');

const signupHandler = (users) => (req, res, next) => {
  const currentUser = req.body;

  if (users[currentUser.username]) {
    res.end('Username not available');
    return;
  }

  users[currentUser.username] = currentUser;
  fs.writeFileSync('data/users.json', JSON.stringify(users), 'utf8');
  res.end('Registration successful!');
};

module.exports = { signupHandler };
