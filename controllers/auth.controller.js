const Userdb = require("../models/auth");
const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken")
// const flash =require("connect-flash")
require("dotenv").config();

let getSignUp = async (req, res, nxt) => {
  const errormsg = req.flash("error");
  res.render("signup", { isUser: false, isAdmin: false, error: errormsg });
};

let postSignUp = async (req, res, nxt) => {
  try {
    //check email
    let user = await Userdb.findOne({ email: req.body.email }).exec();
    if (user) throw new Error("user already exist");
    //check password === confimpassword
    let password = req.body.password;
    let confirmpass = req.body.confirmpassword;
    if (password !== confirmpass)
      throw new Error("confirmpassword not match password");
    //new user
    let passwordhas = await bcrypt.hash(password, 10);
    let userNew = new Userdb({
      name: req.body.name,
      email: req.body.email,
      password: passwordhas,
    });
    // save user
    await userNew.save();
    //jet token
    // const secKey = process.env.secretkey;

    // if (!secKey)
    //   throw new Error("request cannot be fullfilled.... token is not defined");
    // const token = userNew.getAuthToken();
    // const token = jwt.sign({userid:userNew._id},secKey)
    // res.header("x-auth-token", token)
    req.flash("success", "successfully create acount");
    res.status(200).redirect("/login");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

// get login page
let getLogin = (req, res, nxt) => {
  // get flash error
  res.render("login", {
    isUser: false,
    isAdmin: false,
    error: req.flash("error"),
    success: req.flash("success"),
  });
};

let postLogin = async (req, res) => {
  try {
    // check email
    let user = await Userdb.findOne({ email: req.body.email }).exec();
    if (!user) throw new Error("your email or password not valid");

    //check passwprd
    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) throw new Error("your email or password not valid");

    // save session user id
    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    //token jwt

    // const secKey = process.env.secretkey;
    // if (!secKey)
    //   return res
    //     .status(500)
    //     .send("request cannot be fullfilled.... token is not defined");
    // const token = jwt.sign({ userid: user._id,isAdmin:user.isAdmin }, secKey);
    // const token = user.getAuthToken();
    // res.header("x-auth-token", token);
    req.flash("success", "successfully login Welcome to home bage");
    res.redirect("/");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/login");
  }
};

//logout
let logout = async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.status(500).send("Bad Request");
  }
};

module.exports = {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  logout,
};
