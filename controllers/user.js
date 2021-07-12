const bcrypt = require("bcrypt")
const jwt= require("../services/jwt")
const User= require("../models/user")

function singIn(req, res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;
  
    User.findOne({ email:email }, (err, userStored) => {
      if (err) {
        res.status(500).send({ mensaje: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ mensaje: "Usuario no encontrado." });
        } else {
          bcrypt.compare(password, userStored.password, (err, check) => {
            if (err) {
              res.status(500).send({ mensaje: "Error del servidor." });
            } else if (!check) {
              res.status(404).send({ mensaje: "La contraseña es incorrecta." });
            } else {
              if (!userStored.active) {
                res
                  .status(200)
                  .send({ code: 200, mensaje: "El usuario no se ha activado." });
              } else {
                res.status(200).send({
                  accessToken: jwt.createAccessToken(userStored),
                  refreshToken: jwt.createRefreshToken(userStored)
                });
              }
            }
          });
        }
      }
    });
  }

module.exports= singIn