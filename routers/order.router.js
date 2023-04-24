const express = require("express");
const router = express.Router()
const isAuth = require("./guards/auth.guards")
const orderController = require("../controllers/order.controller")

router.get("/order",isAuth.isAuth,orderController.getOrder)

module.exports=router;