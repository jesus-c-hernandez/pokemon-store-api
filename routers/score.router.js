/*
    Users
    Path: /api/scores
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getScore,
  createScore,
  updateScore,
} = require("../controllers/score.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_or_User,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/score/:id", validarJWT, getScore);
router.post(
  "/score/:id",
  [
    validarJWT,
    check("score", "La calificacion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  createScore
);

router.put(
  "/score/:id",
  [
    validarJWT,
    check("score", "La calificacion es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  updateScore
);

module.exports = router;
