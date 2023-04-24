const express = require("express");
const router = express.Router();
const mangeorder = require("../controllers/manage.order.controller");
const adminRole = require("./guards/admin.guards");

router
  .get("/", adminRole, mangeorder.getmange)
  .post("/update", adminRole, mangeorder.update)
  .post("/find", adminRole, mangeorder.findstatus)
  .post("/search",adminRole,mangeorder.search)

module.exports = router;
