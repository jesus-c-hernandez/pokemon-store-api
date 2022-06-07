const express = require('express');
const UserRouter = require('./user.router');
const PokemonRouter = require('./pokemon.router');
const AuthRouter = require('./auth.router');
const ScoreRouter = require('./score.router');

const app = express()

app.use(
  UserRouter,
  PokemonRouter,
  ScoreRouter,
  AuthRouter
);

module.exports = app;