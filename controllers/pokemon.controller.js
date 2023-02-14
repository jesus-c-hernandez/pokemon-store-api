const { response } = require("express");

const Pokemon = require("../models/pokemon.model");

const PokemonService = require("../services/pokemon");

const getPokemon = async ( req, res ) => {
  const id = req.params.id;
  const pokemon = await PokemonService.getPokemon( id );
  res.json({
    ok: true,
    data: pokemon,
  });
}

const getPokemons = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [pokemon, total] = await Promise.all([
    Pokemon.find(
      {},
      "number name description height weight abilities price types moves img score"
    )
      .skip(from)
      .limit(10),
    Pokemon.countDocuments(),
  ]);

  res.json({
    ok: true,
    data: pokemon,
    total,
  });
};

const getTypePokemons = async (req, res) => {
  const from = Number(req.query.from) || 0;
  const type = req.params.type || 'grass';

  const [pokemon, total] = await Promise.all([
    Pokemon.find(
      {
        types: type
      },
      "number name description height weight abilities price types moves img score"
    )
      .skip(from)
      .limit(10),
    Pokemon.countDocuments(),
  ]);

  res.json({
    ok: true,
    data: pokemon,
    total,
  });
};

const getBestPokemons = async (req, res) => {
  const scoreSent = req.params.score || 5;

  const [pokemon, total] = await Promise.all([
    Pokemon.find( {},
      "number name description height weight abilities price types moves img score"
    )
  ]);

  console.log( pokemon );
  const bestPokemon = pokemon.filter( p => { return p.score == scoreSent } ).splice(0, 10);

  res.json({
    ok: true,
    data: bestPokemon,
    total,
  });
};

const updatePokemon = async (req, res = response) => {
  const number = req.params.id;

  console.log( number );

  try {
    const pokemonDB = await Pokemon.find({ number });

    if (!pokemonDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un pokemon con ese id",
      });
    }

    console.log( pokemonDB );

    // Actualizaciones
    const { score } = req.body;

    console.log('Score', score);

    // const userUpdated = await User.findByIdAndUpdate(uid, score, {
    //   new: true,
    // });

    res.json({
      ok: true,
      user: pokemonDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getPokemon,
  getPokemons,
  getTypePokemons,
  getBestPokemons,
  updatePokemon
};
