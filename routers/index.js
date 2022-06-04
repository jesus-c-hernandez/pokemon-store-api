const express = require('express');
const UserRouter = require('./user.router');

const app = express()

app.use(
  UserRouter
);

module.exports = app;