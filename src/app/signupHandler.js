const fs = require('fs');

const signupHandler = (users) => (req, res, next) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).send('Please enter your username!');
    return;
  }

  if (users[username]) {
    res.status(409).send('Username already exists!');
    return;
  }

  users[username] = req.body;
  fs.writeFileSync('data/users.json', JSON.stringify(users), 'utf8');
  res.json(users);
};

module.exports = { signupHandler };
