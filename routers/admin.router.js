const express = require("express");
const router = express.Router();
const adminRole = require("./guards/admin.guards");
const adminController = require("../controllers/admin.controller");

router
  .get("/manageadmin", adminRole, adminController.getmanageAdmin)
  .post("/addadmin", adminRole, adminController.addadmin)
  .post("/deleteadmin", adminRole, adminController.deleteAdmin);

module.exports = router;
