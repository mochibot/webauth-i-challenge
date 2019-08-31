const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router');
const userRouter = require('../api/user/user-router');
const knexConnection = require('../data/data-config');

const server = express();

const sessionOptions = {
  name: 'omurice',
  secret: process.env.COOKIE_SECRET || 'this is very secret stuff',
  secure: process.env.COOKIE_SECURE || false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  })
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionOptions))

server.use('/api/auth', authRouter);
server.use('/api/restricted', userRouter);

server.get('/', (req, res) => {
  res.status(200).json('server is running');
})


module.exports = server;