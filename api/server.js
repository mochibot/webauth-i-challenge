const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const cors = require('cors');
const userDB = require('./user/user-model');
const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).json('server is running');
})

//register an user
server.post('/api/register', validateUserInput, async (req, res) => {
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
server.post('/api/login', validateUserInput, async (req, res) => {
  let { username, password } = req.body;
  try {
    const user = await userDB.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}! You are now logged in.` });
    } else {
      res.status(401).json({ message: 'You shall not pass' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user'});
  }
})

//get a list of users
server.get('/api/users', restricted, async (req, res) => {
  try {
    const users = await userDB.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user'});
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

module.exports = server;