const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/registro", function(req, res) {
    req.app.locals.db.collection("users")
    .find({ email:req.body.email})
    .toArray(function (err, user){
        if(!req.body.password || !req.body.reppassword){
            res.status(404).send({logged:true, mensaje:"Introduce una contraseña"})
        }else{
            if(!req.body.usuario){
                res.status(404).send({logged:true, mensaje:"Introduce un usuario"})
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
        }
        
    })

})



    router.post("/misdatos", function (req, res) {
        req.app.locals.db.collection("users").find({email: req.body.email})
          .toArray(function (error, datos) {
            if(datos.length !==0){
              res.send({ error: false, contenido: datos, mensaje:"usuario"   })
            }else{
              res.send({ error: true, mensaje:"No se han encontrado usuario" });
            }
            
          });
      });

router.put("/editar", function (req, res) {
    req.app.locals.db.collection("users").updateOne({ email: req.body.email },{$set: {
        usuario: req.body.usuario   
      },
    },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ mensaje: "Ha habido un error" + error });
      } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
        if(datos.matcheCount !=1 ){
        if(datos.modifiedCount==1){
          res.send({error:false, mensaje:"Usuario actualizado"})

        }else{
          res.send({error:true, mensaje:"no se ha podido actualizar"})

        }
      }else{
        res.send({error:true, mensaje:"Usuario no encontrado"})
      }
      }
    }
  );
});


module.exports = router;