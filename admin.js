const express = require("express");
const router = express.Router();

router.post("/guardarReceta", function(req, res) {
    req.app.locals.db.collection("recetasguardadas")
    .find({ titulo:req.body.titulo})
    .toArray(function (err, user){
        if (user.length === 0){
            req.app.locals.db.collection("recetasguardadas").insertOne(
                {                                      
                    email:req.body.email, 
                    categoria: req.body.categoria, 
                    dificultad: req.body.dificultad , 
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
            res.send({ mensaje: "Receta ya guardada"})
        }
    })

})

module.exports = router;