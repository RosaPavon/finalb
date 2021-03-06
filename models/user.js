const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchame = Schema({
  usuario: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  imagen: String
});

module.exports = mongoose.model("User", UserSchame);