const express = require("express");
const router = express.Router();

router.post("/nuevoComentario", function(req, res) {
  req.app.locals.db.collection("comentarios").insertOne(
      {       
        titulo: req.body.titulo,                               
        comentario:req.body.comentario, 
        email:req.body.email,
        imagenComentario:req.body.imagenComentario, 
        usuarioComentario:req.body.usuarioComentario
          
      },
      function (err, respuesta){
           if (err !== null){
              console.log(err)
              res.send({mensaje: "Ha habido un error" + err})
           }else{
              res.send({mensaje:"Comentario enviado"})
          }
      }
  )        
    })


    router.post("/comentariosUsers", function (req, res) {
        req.app.locals.db.collection("comentarios").find({ email:req.body.email})
          .toArray(function (error, datos) {
            if(datos.length !==0){
              res.send({ error: false, contenido: datos  })
            }else{
                res.send({ error: true, mensaje:"No se han encontrado comentarios"  });
            }
            
          });
      });




module.exports = router;