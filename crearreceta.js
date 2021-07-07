
const express = require("express");
const router = express.Router();

router.post("/crearNuevaReceta", function(req, res) {
    req.app.locals.db.collection("recetas")
    .find({ titulo:req.body.titulo})
    .toArray(function (err, user){
        if (user.length === 0){
            req.app.locals.db.collection("recetas").insertOne(
                {
                    titulo:req.body.titulo,
                    receta:req.body.receta,
                    
                },
                function (err, respuesta){
                    if (err !== null){
                        console.log(err)
                        res.send({mensaje: "Ha habido un error" + err})
                    }else{
                        res.send({mensaje:"Receta guardada"})
                    }
                }
            )
        }else{
            //falta añadir si esta en blanco
            res.send({ mensaje: "Título ya registrado"})
        }
    })

})

router.get("/misrecetas", function (req, res) {
    req.app.locals.db.collection("recetas").find()
      .toArray(function (error, datos) {
        if(datos.length !==0){
          res.send({ error: false, contenido: datos  })
        }else{
          res.send({ error: true, mensaje:"No se han encontrado recetas"});
        }
        
      });
  });





module.exports = router;