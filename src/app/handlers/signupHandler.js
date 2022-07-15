const fs = require('fs');

const signupHandler = (req, res, next) => {
  const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
  const currentUser = req.body;

  if ((users.filter(user => user.username === currentUser.username).length > 0)) {
    res.end('Username not available');
    return;
  }

  users.push(currentUser);
  fs.writeFileSync('data/users.json', JSON.stringify(users), 'utf8');
  res.end('Registration successful!');
};

module.exports = { signupHandler };
