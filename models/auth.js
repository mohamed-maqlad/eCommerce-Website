const mongoose = require("mongoose");
const valid = require("validator");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return valid.isEmail(val);
      },
      message: "{VALUE} is not valid email",
    },
  },
  isAdmin:{
    type:Boolean,
    default:false

  },
password: {
    type: String,
    required: true,
    minlength: 5,
  },
  contact:{
    type:Number,
    min:5
  },
  address:{
    type:String
  },
  image:{
    type:String,
    default:"profileimg.jpeg"
  }
});

// userSchema.method("getAuthToken", function () {
//   const secKey = process.env.secretkey;
//   const token = jwt.sign(
//     {
//       userid: this._id,
//       adminRole:this.isAdmin
//     },
//     secKey
//   );
//   return token;
// });

module.exports = mongoose.model("users", userSchema);
