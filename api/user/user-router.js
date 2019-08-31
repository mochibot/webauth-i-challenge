const express = require('express');

const userDB = require('./user-model');
const restricted = require('../../auth/restricted-middleware');

const router = express.Router();

//get a list of users
router.get('/users', restricted, async (req, res) => {
  try {
    const users = await userDB.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching user'});
  }
})

module.exports = router;