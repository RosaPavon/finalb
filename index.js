const express=require("express")
const cors= require("cors")
const mongodb = require("mongodb")
const router = express.Router()
const bcrypt=require("bcrypt")
const jwt = require("./services/jwt");
require("dotenv").config()



const app =express()

let puerto= process.env.PORT || 3001

let MongoClient = mongodb.MongoClient
let db 


const passport = require("passport")



app.use(express.urlencoded({ extended : false}))//para acceder al body de la petición
app.use(express.json())
app.use(cors())


const usuarios= require("./usuarios")
app.use("/usuarios", usuarios)
const login= require("./login")
app.use("/login", login)

const crearreceta= require("./crearreceta")
app.use("/crearreceta", crearreceta)

const asistira= require("./asistira")
app.use("/asistira", asistira)

const noasistira= require("./noasistira")
app.use("/noasistira", noasistira)

const comentarios= require("./comentarios")
app.use("/comentarios", comentarios)

const admin= require("./admin")
app.use("/admin", admin)

app.use(passport.initialize())
app.use(passport.session()) 

MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology:true}, function(error, client){
    error
    ? console.log("🔴 Mongodb no conectado")
    : (app.locals.db = client.db("cocinillas"), console.log("🟢 Mongodb conectado"))
})



//-------------Rutas-------


app.post("/usuario", function (req,res){
    //console.log("prueba 1")
    if(req.isAuthenticated()){
        app.locals.db.collection("users").findOne({email:req.body.email},
            function (err,user){
                res.send({user:user})
         }) }   
})

app.listen(puerto, function(err){
    err
    ? console.log("🔴 Servidor fallido")
    : console.log("🟢 Servidor funcionando en el puerto:" + puerto)
})