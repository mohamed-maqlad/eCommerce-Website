const userdb = require("../models/auth");



// get addadmin page
let getmanageAdmin = async (req, res, nxt) => {
  try {
    res.render("manageAdmin", {
      isUser: true,
      isAdmin: true,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/");
  }
};

//put add admin

let addadmin = async (req, res, nxt) => {
  try {
    let newadmin = await userdb.findOneAndUpdate(
      { email: req.body.email },
      { isAdmin: true }
    );
    if (!newadmin ) throw new Error("not found user");
    if (newadmin.isAdmin) throw new Error("user already admin");

    req.flash("success", "Add Admin successfully");
    res.redirect("/admin/manageadmin");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/admin/manageadmin");
  }
};
//delete admin

let deleteAdmin= async (req,res,nxt)=>{
  try {
    let admin = await userdb.findOneAndUpdate({email:req.body.email},{isAdmin:false})
    if (!admin) throw new Error("not foud admin email");
    if(admin.isAdmin === false) throw new Error("these user is not admin");
    req.flash("success", "Delete Admin successfully");
    res.redirect("/admin/manageadmin")
  } catch (error) {
    console.log(error.message)
    req.flash("error", error.message);
    res.redirect("/admin/manageadmin")
  }

}
module.exports = {
  getmanageAdmin,
  addadmin,
  deleteAdmin,
};
