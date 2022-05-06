const express = require("express");
const router = express.Router();

router.post("/noasistira", function(req, res) {
    req.app.locals.db.collection("noasistiran")
    .find({ nombreno:req.body.nombreno})
    .toArray(function (err, user){
        if (user.length === 0){
            req.app.locals.db.collection("noasistiran").insertOne(
                {           
                nombreno: req.body.nombreno,                 
                comentariosno: req.body.comentariosno
   
                    
                },
                function (err, respuesta){
                    if (err !== null){
                        console.log(err)
                        res.send({mensaje: "Ha habido un error" + err})
                    }else{
                        res.send({mensaje:"Esperamos verte pronto!"})
                    }
                }
            )
        }else{
            //falta añadir si esta en blanco
            res.send({ mensaje: "Ya ha indicado su no asistencia"})
        }
    })

})



module.exports = router;