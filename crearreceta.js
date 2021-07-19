
const express = require("express");
const router = express.Router();

router.post("/crearNuevaReceta", function(req, res) {
    req.app.locals.db.collection("recetas")
    .find({ titulo:req.body.titulo})
    .toArray(function (err, user){
        if (user.length === 0){
            req.app.locals.db.collection("recetas").insertOne(
                {                                      
                    usuario:req.body.name,
                    email:req.body.email, 
                    categoria: req.body.categoria, 
                    dificultad: req.body.dificult , 
                    titulo:req.body.titulo,                   
                    ingredientes:req.body.ingredientes,
                    receta:req.body.receta,
                    foto:req.body.foto,       
                    
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

router.post("/misrecetas", function (req, res) {
    req.app.locals.db.collection("recetas").find({ email:req.body.email})
      .toArray(function (error, datos) {
        if(datos.length !==0){
          res.send({ error: false, contenido: datos  })
        }else{
            res.send({ error: true, mensaje:"No se han encontrado recetas de este usuario" });
        }
        
      });
  });

  router.put("/editar", function (req, res) {
    req.app.locals.db.collection("recetas").updateOne({ titulo: req.body.titulo },{$set: {
          usuario:req.body.name,
          email:req.body.email, 
          categoria: req.body.categoria, 
          dificultad: req.body.dificult , 
          titulo:req.body.modftitulo,                   
          ingredientes:req.body.ingredientes,
          receta:req.body.receta,
          foto:req.body.foto, 
      },
    },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ mensaje: "Ha habido un error" + error });
      } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
        if(datos.matcheCount !=1 ){
        if(datos.modifiedCount==1){
          res.send({error:false, mensaje:"Receta actualizada"})

        }else{
          res.send({error:true, mensaje:"no se ha podido actualizar"})

        }
      }else{
        res.send({error:true, mensaje:"receta no encontrada"})
      }
      }
    }
  );
});

router.delete("/eliminar", function (req, res) {
    req.app.locals.db.collection("recetas").deleteOne({ titulo: req.body.titulo },
      function (error, datos) {
        if (error !== null) {
          console.log(error);
          res.send({ mensaje: "Ha habido un error" + error });
        } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
          if(datos.matcheCount !=1 ){
          if(datos.modifiedCount==1){
            res.send({error:true, mensaje:"no se ha podido borrar"})
  
          }else{
            res.send({error:false, mensaje:"Receta borrada"})
  
          }
        }else{
          res.send({error:true, mensaje:"Receta no encontrada"})
        }
        }
      }
    );
  });

module.exports = router;