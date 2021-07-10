const express=require("express")
const cors= require("cors")
const mongodb = require("mongodb")
const router = express.Router()
const bcrypt=require("bcrypt")
require("dotenv").config()



const app =express()

let puerto= process.env.PORT || 3001

let MongoClient = mongodb.MongoClient
let db 


/* const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session") */



app.use(express.urlencoded({ extended : false}))//para acceder al body de la petición
app.use(express.json())
app.use(cors())

/* app.use(
    session({
        secret:"patatamaster",//el string que autetifica que esta cookie la puso esta web
        resave:false,//evitar crear sesiones vacias
        saveUninitialized:false,//evita reseteo de sesion
    })
) */

const usuarios= require("./usuarios")
app.use("/usuarios", usuarios)

/* const crearreceta= require("./crearreceta")
app.use("/crearreceta", crearreceta)  */

/* app.use(passport.initialize())
app.use(passport.session()) */

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology:true}, function(error, client){
    error
    ? console.log("🔴 Mongodb no conectado")
    : (app.locals.db = client.db("cocinillas"), console.log("🟢 Mongodb conectado"))
})

//-------------Rutas-------


app.post("/usuario", function (req,res){
    console.log("prueba 1")
    if(req.isAuthenticated()){
        app.locals.db.collection("users").findOne({email:req.body.email},
            function (err,user){
                res.send({user:user})
         }) 

    }
    
})

app.listen(puerto, function(err){
    err
    ? console.log("🔴 Servidor fallido")
    : console.log("🟢 Servidor funcionando en el puerto:" + puerto)
})


/* 
//____Autorización y gestión de sesiones____

passport.use(
    new LocalStrategy(//creamos una nueva clase
        {//este objeto da la info de email y password
            usernameField: "email",//aqui nos permite modificar el email por otro elemento
            passwordField: "password"//aqui nos permite modificar el password por otro elemento
        },
        function( email, password, done){//done es funcion interna de passport para ir avanzando pasos
            app.locals.db.collection("users").findOne(//los datos de nuestro servidor
                {email : email},//buscamos el email que le hemos pasado
                function (err, user){
                    if(err){
                        return done (err)
                    }
                    if (!user){//existe el usuario?
                        return done(null, false)
                    }
                    if( user.password !== password){//si si existe el usuario comprobamos el password
                        return done (null, false)
                    }
                    return done (null, user)//si todo esta ok creamos una sesión al usuario, y pone una cookie en la sesión del usuario
                })
        }
    )
)

passport.serializeUser(function (user, done){
    done(null, user.email)//done llama al siguiente paso
})


passport.deserializeUser(function (email, done){
    app.locals.db.collection("users").findOne({email:email}, function (err,user){
        
        if (err){
            return done(err)
        }
        if(!user){
            return done(null, null)
        }
        return done(null, user) //console.log(user)
    })
})
//asi creamos la cookie en el ordenador del usuario para su usuario

//___________________Login___________________

app.post(//funcion authenticate de passport
    "/login",
    passport.authenticate("local", {
        
        successRedirect:"/api",//si es ok redirigimos a esta dirección
        failureRedirect: "/api/fail",//si ha ido mal redirigimos a esta dirección
    })
)

//login ok

app.all("/api", function (req, res){
    //hacer llamada a la api y recuperar el usuario
   
   app.locals.db.collection("users").findOne({email:req.body.email},
   function (err,user){
    if (err){
        res.send({mensaje:"error"})
    }
    else{
        res.send({logged:true, mensaje:"Login correcto", user:req.user})
    }
}) 
    
})

//Fail

app.all("/api/fail", function(req, res){
    res.status(401).send ({
        logged:false,
        mensaje:"Login incorrecto"})
})



//__________________Logout____________________

app.post("/logout", function(req, res){
    req.logOut()
    res.send({mensaje: " Logout correcto"})
})
 */



