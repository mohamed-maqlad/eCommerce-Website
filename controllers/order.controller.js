const cart = require("../models/cart");
const userCart = require("../models/cart");
const orderdb = require("../models/order");

let getOrder = async (req, res, nxt) => {
  try {
    let userOreder = await orderdb.find({ orderId: req.session.userId }).exec();
    // let cart = await order.find({cart : req.session.userId}).exec()
  //   console.log(String(userOreder))
  //  let cart = String(userOreder)
    // let user = userOreder.toString()
    if(userOreder.length===0) throw new Error("you not have order") 
    res.render("order", {
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      userOreder:userOreder,
      success:req.flash("success")
    });
  } catch (error) {
    console.log(error.message);
    req.flash("errorOrder",error.message);
    res.redirect("/");
  }
};



module.exports = {
  getOrder,
};
