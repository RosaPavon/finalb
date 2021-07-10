const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/registro", function(req, res) {
    //añadir bcrypt
    req.app.locals.db.collection("users")
    .find({ email:req.body.email})
    .toArray(function (err, user){
        if(!req.body.password || !req.body.reppassword){
            res.status(404).send({logged:true, mensaje:"Introduce una contraseña"})
        }else{
            if(!req.body.email){
                res.status(404).send({logged:true, mensaje:"Introduce un email"})
            }else{
            if(req.body.password !== req.body.reppassword){
                res.status(404).send({logged:true, mensaje:"Las contraseñas no coinciden"})
            }else{               

            if (user.length === 0){// si no hay usuario puedo crear uno 
                let contraseinaCifrada = bcrypt.hashSync( req.body.password, 10 )
                req.app.locals.db.collection("users").insertOne(//inserto un usuario
                    {
                        usuario:req.body.usuario,
                        email:req.body.email,
                        password:contraseinaCifrada,
                        reppassword: contraseinaCifrada,
                        role: "admin",
                        active: false
    
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
                res.send({logged:true, mensaje: "Error:email ya registrado"})
            }
        }

            }
        }
        
    })

})





module.exports = router;