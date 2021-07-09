const express = require("express");
const router = express.Router();

router.post("/registro", function(req, res) {
    //añadir bcrypt
    req.app.locals.db.collection("users")
    .find({ email:req.body.email})
    .toArray(function (err, user){
        if (user.length === 0){// si no hay usuario puedo crear uno 
            req.app.locals.db.collection("users").insertOne(//inserto un usuario
                {
                    usuario:req.body.usuario,
                    email:req.body.email,
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
            //falta añadir si esta en
            res.send({ mensaje: "Email ya registrado"})
        }
    })

})





module.exports = router;