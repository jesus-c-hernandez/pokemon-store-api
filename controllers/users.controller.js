const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { generarJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  // const total = await User.count();

  const [user, total] = await Promise.all([
    User.find({}, "name lastName email address phone google")
      .skip(from)
      .limit(5),
    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    user,
    uid: req.uid,
    total,
  });
};

const getUser = async (req, res) => {
  const uid = req.params.id;

  // const total = await User.count();

  const userDB = await User.findById(uid);

  if (!userDB) {
    return res.status(404).json({
      ok: false,
      msg: "No existe un usuario con ese id",
    });
  }

  res.json({
    ok: true,
    user: userDB,
    uid: req.id,
  });
};

const createUser = async (req, res = response) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }
    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    // Generar token
    const token = await generarJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;
    if (userDB.email != email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    if (!userDB.google) {
      campos.email = email;
    } else if (userDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuarios de google no pueden cambiar su correo",
      });
    }
    const userUpdated = await User.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mgs: "Hable con el admin",
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
