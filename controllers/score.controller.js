const { response } = require("express");

const User = require("../models/user.model");

const Score = require("../models/score.model");

const getScore = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    const scoreDB = await Score.findOne({ userId: uid });

    if (!scoreDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una calificacion por este usuario",
      });
    }
    res.json({
      ok: true,
      score: scoreDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const createScore = async (req, res = response) => {
  const uid = req.params.id;
  const score = req.body.score;

  const userDB = await User.findById(uid);

  if (!userDB) {
    return res.status(404).json({
      ok: false,
      msg: "No existe un usuario con ese id",
    });
  }

  const scoreDB = await Score.findOne({ userId: uid });

  if (scoreDB) {
    return res.status(404).json({
      ok: false,
      msg: "Ya existe una calificacion por este usuario",
    });
  }

  const scoreObj = new Object({
    userId: uid,
    score: score,
  });

  const scoreToSave = new Score(scoreObj);

  const scoreCreated = await scoreToSave.save();

  res.json({
    ok: true,
    score: scoreCreated,
  });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const updateScore = async (req, res = response) => {
  const userId = req.params.id;
  const score = req.body.score;

  try {
    const userDB = await User.findById(userId);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese id",
      });
    }

    const scoreDB = await Score.findOne({ userId });

    if (!scoreDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe una calificacion por este usuario",
      });
    }

    const uid = (scoreDB._id).toString();

    const scoreObj = new Object({
      userId: userId,
      score: score,
    });

    const scoreUpdated = await Score.findByIdAndUpdate(uid, scoreObj, {
      new: true,
    });

    res.json({
      ok: true,
      score: scoreUpdated,
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
  getScore,
  createScore,
  updateScore,
};
