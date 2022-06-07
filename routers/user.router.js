/*
    Users
    Path: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_or_User,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get( '/users', validarJWT, getUsers );
router.get("/users/:id",validarJWT, getUser);

router.post(
  "/users",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("address", "La direccion es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createUser
);

router.put(
  "/users/:id",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("address", "La direccion es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateUser
);

router.delete("/users/:id", [validarJWT], deleteUser);

module.exports = router;
