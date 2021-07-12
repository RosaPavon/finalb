const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("./services/jwt");

router.post("/login", function(req, res) {
const email = req.body.email.toLowerCase();
const password = req.body.password;
    req.app.locals.db.collection("users")
    .findOne({ email }, (err, userStored) => {
        if (err) {
          res.status(500).send({ logged:false, mensaje: "Error del servidor." });
        } else {
          if (!userStored) {
            res.status(404).send({ logged:false,mensaje: "Usuario no encontrado." });
          } else {
            bcrypt.compare(password, userStored.password, (err, check) => {
              if (err) {
                res.status(500).send({ logged:false,mensaje: "Error del servidor." });
              } else if (!check) {
                res.status(404).send({ logged:false, mensaje: "La contraseña es incorrecta." });
              } else {
                    res.status(200).send({
                    logged:true, mensaje:"Login correcto",
                    accessToken: jwt.createAccessToken(userStored),
                    refreshToken: jwt.createRefreshToken(userStored)
                  });
                
              }
            });
          }
        }
      });
    }        
    )







module.exports = router;