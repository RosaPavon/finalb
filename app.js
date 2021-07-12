const express= require("express")
const app=express()

const userRoutes =require("./routers/user")

app.use(express.urlencoded({ extended : false}))//para acceder al body de la petición
app.use(express.json())

app.use(`/`, userRoutes)

module.exports=app
 



