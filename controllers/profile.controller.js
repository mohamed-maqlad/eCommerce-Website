const usersdb = require("../models/auth");
const { use } = require("../routers/mangeProduct.router");
const bcrypt = require("bcrypt")

//get profile page
let getProfile = async (req, res, nxt) => {
  try {
    let user = await usersdb.findById({ _id: req.session.userId });
    res.render("profile", {
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      user,
      error: req.flash("error"),
      success:req.flash("success")
    });
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
};

//post profile update

let postProfile = async (req, res, nxt) => {
  try {
    // const {image} = req.file.filename
    const password = req.body.password
    const passwordhas = await bcrypt.hash(password, 10);
    let user = await usersdb.findByIdAndUpdate(
      { _id: req.session.userId },
      {
        name: req.body.name,
        email: req.body.email,
        password: passwordhas,
        contact: req.body.contact,
        address: req.body.address,
        image: req.file.filename,
      },
    );
    if (!user) throw new Error("not found user");
    console.log(user)
    req.flash("success", "updated successfully")
    res.redirect("/profile");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/profile");
  }
};
module.exports = {
  getProfile,
  postProfile,
};
