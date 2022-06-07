const { Schema, model } = require("mongoose");

const Score = require("../models/score.model");

const PokemonSchema = Schema({
  number: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  height: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  abilities: [String],
  price: {
    type: Number,
    require: true,
  },
  types: [String],
  moves: [String],
  img: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
  },
});

PokemonSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Pokemon", PokemonSchema);
