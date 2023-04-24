const express = require("express");
const router = express.Router()
const profileController = require("../controllers/profile.controller")
const validator =require("../middlewares/profileUpdateValidate")
const isAuth = require("./guards/auth.guards")
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

router.get("/",isAuth.isAuth,profileController.getProfile)
.post("/update",isAuth.isAuth,upload.single('image'),validator,profileController.postProfile)

module.exports=router;