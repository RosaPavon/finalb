const express = require("express");
const router = express.Router();

router.post("/registro", function(req, res) {
    //añadir bcrypt
    req.app.locals.db.collection("users")
    .find({ username:req.body.username})
    .toArray(function (err, user){
        if (user.length === 0){// si no hay usuario puedo crear uno 
            req.app.locals.db.collection("users").insertOne(//inserto un usuario
                {
                    username:req.body.username,
                    password: req.body.password,
                },
                function (err, respuesta){
                    if (err !== null){
                        console.log(err)
                        res.send({mensaje: "Ha habido un error" + err})
                    }else{
                        res.send({mensaje:"Registrado"})
                    }
                }
            )
        }else{
            res.send({ mensaje: "Usuario ya registrado"})
        }
    })

})






module.exports = router;