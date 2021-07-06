const express=require("express")
const app =express()
const cors= require("cors")
let puerto= process.env.PORT || 3001

const mongodb = require("mongodb")
let MongoClient = mongodb.MongoClient
let db

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")

app.use(express.urlencoded({ extended : false}))//para acceder al body de la petición
app.use(express.json())
app.use(cors())

app.use(
    session({
        secret:"patata",//el string que autetifica que esta cookie la puso esta web
        resave:false,//evitar crear sesiones vacias
        saveUninitialized:false,//evita reseteo de sesion
    })
)

app.use(passport.initialize())
app.use(passport.session())

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology:true}, function(error, client){
    error
    ? console.log("🔴 Mongodb no conectado")
    : (db = client.db("cocinillas"), console.log("🟢 Mongodb conectado"))
})

//____Autorización y gestión de sesiones____

passport.use(
    new LocalStrategy(//creamos una nueva clase
        {//este objeto da la info de email y password
            usernameField: "email",//aqui nos permite modificar el email por otro elemento
            passwordField: "password"//aqui nos permite modificar el password por otro elemento
        },
        function( email, password, done){//done es funcion interna de passport para ir avanzando pasos
            db.collection("users").findOne(//los datos de nuestro servidor
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
                }
            )
        }
    )
)

passport.serializeUser(function (user, done){
    done(null, user.email)//done llama al siguiente paso
})

passport.deserializeUser(function (email, done){
    db.collection("users").findOne({email:email}, function (err,user){
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
   res.send({logged:true, mensaje:"Login correcto"})
    
})

//Fail

app.all("/api/fail", function(req, res){
    res.status(401).send ({
        logged:false,
        mensaje:"Denegado"})
})

//__________________Logout____________________

app.post("/logout", function(req, res){
    req.logOut()
    res.send({mensaje: " Logout correcto"})
})

//___________________Rutas____________________

app.post("/registro", function(req, res) {
    //añadir bcrypt
    db.collection("users")
    .find({ email:req.body.email})
    .toArray(function (err, user){
        if (user.length === 0){// si no hay usuario puedo crear uno 
            db.collection("users").insertOne(//inserto un usuario
                {
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
            res.send({ mensaje: "Usuario ya registrado"})
        }
    })

})

//_______________Pruebas__________

app.get("/prueba", function(req, res){
    req.isAuthenticated()
    ? res.send({mensaje:"Todo ok"})
    : res.send({mensaje:"Necesitas logearte"})
})



app.listen(puerto, function(err){
    err
    ? console.log("🔴 Servidor fallido")
    : console.log("🟢 Servidor funcionando en el puerto:" + puerto)
})
