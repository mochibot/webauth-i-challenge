const bcrypt = require('bcrypt');
const userDB = require('../api/user/user-model');

function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    userDB.findUserByUsername(username)
      .then(response => {
        if (response && bcrypt.compareSync(password, response.password)) {
          next();
        } else {
          res.status(401).json({ message: 'You shall not pass' }); 
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Internal server error'});
      })
  } else {
    res.status(400).json({ message: 'Please provide valid credentials' });
  }
}

module.exports = restricted;