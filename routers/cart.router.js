const express = require("express")
const router = express.Router()
const cartcontroller = require("../controllers/cart.controller")
const validator = require("../middlewares/cartMWValidat")
const userAuth =require("./guards/auth.guards")

router.post("/",userAuth.isAuth,cartcontroller.addNewItem)
.get("/",userAuth.isAuth,cartcontroller.getItemCart)
.post("/save",userAuth.isAuth,cartcontroller.editItem)
.post("/delete",userAuth.isAuth,cartcontroller.deleteItem)
.post("/deletall",userAuth.isAuth,cartcontroller.deletcart)
.post("/saveorder",userAuth.isAuth,cartcontroller.saveOreder)

module.exports= router