const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validatorup = require("../middlewares/authSignUpMWValidator")
const validatorlogin = require("../middlewares/login.MWVlator")
const notAuth = require("../routers/guards/auth.guards")


router.get("/signup",notAuth.notAuth, authController.getSignUp)
.post("/signup",notAuth.notAuth,validatorup,authController.postSignUp)
.get("/login",notAuth.notAuth,authController.getLogin)
.post("/login",notAuth.notAuth,validatorlogin,authController.postLogin)
.post("/logout",notAuth.isAuth,authController.logout)



module.exports = router;
