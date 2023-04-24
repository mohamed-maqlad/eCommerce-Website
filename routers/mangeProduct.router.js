const express = require("express");
const router = express.Router();
const manageprodcutController = require("../controllers/managePorduct.controller");
const adminRole = require("./guards/admin.guards");
const multer = require("multer")
const path = require("path")


// configure multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname,"../imeges"));
        
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  // create a multer middleware that handles the file upload
const upload = multer({ storage: storage });


router
  .get("/", adminRole, manageprodcutController.getAddPorduct)
  .post("/addproduct",adminRole,upload.single('image'),manageprodcutController.addPoduct)
  .get("/update/:id",adminRole,manageprodcutController.getUpdate)
  .post("/update",adminRole,manageprodcutController.postUpdate)
  .post("/delete",adminRole,manageprodcutController.deleteProduct)

module.exports = router;
