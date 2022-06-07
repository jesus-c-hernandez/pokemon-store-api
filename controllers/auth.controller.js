const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response)  => {

    const { email, password } = req.body;

    try {

        // Verificar email
        const userDB = await User.findOne({ email });

        if( !userDB ){
            res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar password
        const validPass = bcrypt.compareSync( password, userDB.password );
        if( !validPass ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar token
        const token = await generarJWT( userDB.id );

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async ( req, res = response) => {

    const googleToken = req.body.token;

    try {
        
        const { name, email, picture } = await googleVerify( googleToken );

        const userDB = await User.findOne({ email });
        let user;
        if( !userDB ){
            // Si no existe
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Existe usuario
            user = userDB;
            user.google = true;
        }

        // Guardar en base de datos
        await user.save();

        // Generar token
        const token = await generarJWT( user.id );

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }

}

const renewtoken = async ( req, res = response ) => {

    const uid = req.uid;

    // Generar token
    const token = await generarJWT( uid );

    //Obtener el usuario por id 

    const user = await User.findById( uid );

    res.json({
        ok: true,
        token,
        user,
    });

}

module.exports = {
    login,
    googleSignIn,
    renewtoken
}