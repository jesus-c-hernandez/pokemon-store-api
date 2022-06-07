const { Schema, model } = require("mongoose");

const ScoreSchema = Schema({
  userId: {
    type: String,
    require: true,
    unique: true
  },
  score: {
    type: Number,
    require: true
  }
});

ScoreSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Score", ScoreSchema);
