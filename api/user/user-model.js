const db = require('../../data/data-config');

module.exports = {
  findUsers,
  findUserByUsername,
  findUserById,
  addUser
}

function findUsers() {
  return db('users');
}

function findUserByUsername(username) {
  return db('users').where({ username }).first();
}

function findUserById(id) {
  return db('users').where({ id }).first();
}

function addUser(user) {
  return db('users').insert(user).then(id => findUserById(id[0]));
}