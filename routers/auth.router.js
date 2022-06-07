/*
    Path: /api/login
*/

const { Router } = require('express');
const { login, googleSignIn, renewtoken } = require('../controllers/auth.controller');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/login', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);
router.post( '/login/google', 
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);
router.get( '/renew', validarJWT , renewtoken );


module.exports = router
