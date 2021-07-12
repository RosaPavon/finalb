const express = require("express")
const UserController = require("../controllers/user")


api.post("/sing-in", UserController.singIN )

module.exports=api