const express = require("express")
const router = express.Router()
const hoemeController = require("../controllers/home.controller")

router.get('/',hoemeController.getProduct)


module.exports = router;