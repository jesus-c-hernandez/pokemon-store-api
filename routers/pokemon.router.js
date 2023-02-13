/*
    Users
    Path: /api/pokemons
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getPokemons, getTypePokemons, getBestPokemons, updatePokemon } = require('../controllers/pokemon.controller');
const { validarCampos } = require("../middlewares/validar-campos");
const {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_or_User,
  } = require("../middlewares/validar-jwt");

const router = Router();

router.get( '/pokemons', getPokemons );
router.get( '/pokemons/type/:type', getTypePokemons );
router.get( '/pokemons/score/:score', getBestPokemons );

router.put(
  '/pokemons/:id',
  [
    validarJWT,
    check("score", "La calificacion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  updatePokemon
);

module.exports = router;