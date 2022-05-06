const express = require("express");
const router = express.Router();

router.post("/asistira", function(req, res) {
    req.app.locals.db.collection("asistiran")
    .find({ nombre:req.body.nombre})
    .toArray(function (err, user){
        if (user.length === 0){
            req.app.locals.db.collection("asistiran").insertOne(
                {           
                intolencia: req.body.intolencia, 
                nombre: req.body.nombre, 
                numero: req.body.numero, 
                comentarios: req.body.comentarios
   
                    
                },
                function (err, respuesta){
                    if (err !== null){
                        console.log(err)
                        res.send({mensaje: "Ha habido un error" + err})
                    }else{
                        res.send({mensaje:"Nos vemos pronto!"})
                    }
                }
            )
        }else{
            //falta añadir si esta en blanco
            res.send({ mensaje: "Ya ha indicado su asistencia"})
        }
    })

})



module.exports = router;