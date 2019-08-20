const express = require('express');
const bcrypt = require('bcrypt');
const userDB = require('../api/user/user-model');

const router = express.Router();

//register an user
router.post('/register', validateUserInput, async (req, res) => {
  let user = req.body;
  
  try {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    const newUser = await userDB.addUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user'});
  }
}) 

//logging in user
router.post('/login', validateUserInput, async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await userDB.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.status(200).json({ message: `Welcome ${user.username}! You are now logged in.` });
    } else {
      res.status(401).json({ message: 'You shall not pass' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user'});
  }
})

//middleware
function validateUserInput(req, res, next) {
  const body = req.body;
  if (!body.username || !body.password) {
    res.status(400).json({ message: 'Username and password are required' });
  } else {
    next();
  }
}

module.exports = router;