/*
    Users
    Path: /api/pokemons
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getPokemon,
  getPokemons,
  getTypePokemons,
  getBestPokemons,
  updatePokemon,
} = require("../controllers/pokemon.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/pokemon/:id", getPokemon );
router.get("/pokemons", getPokemons);
router.get("/pokemons/type/:type", getTypePokemons);
router.get("/pokemons/score/:score", getBestPokemons);

router.put(
  "/pokemons/:id",
  [
    validarJWT,
    check("score", "La calificacion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  updatePokemon
);

module.exports = router;
