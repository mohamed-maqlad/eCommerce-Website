const express = require("express");
const router = express.Router();
const prodectController = require("../controllers/product.controller");
const isAuth = require("./guards/auth.guards")
router
  .get("/product/:id",isAuth.isAuth, prodectController.getProduct);

module.exports = router;
