const ordersdb = require("../models/order");

let getmange = async (req, res, nxt) => {
  try {
    let orders = await ordersdb.find({}).exec();
    if (orders.length===0) throw new Error("not found order");
    res.render("manageorder", {
      orders,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/");
  }
};

let update = async (req, res, nxt) => {
  try {
    let order = await ordersdb.findByIdAndUpdate(
      { _id: req.body.orderid },
      { status: req.body.status }
    );
    req.flash("success", "updated successfily");
    res.redirect("/manageorder");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/manageorder");
  }
};

let findstatus = async (req, res, nxt) => {
  try {
    let orders = await ordersdb.find({ status: req.body.status }).exec();
    console.log(orders);
    if (orders.length===0) throw new Error("not found order");
    res.render("manageorder", {
      orders,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/manageorder");
  }
};

let search = async (req, res, nxt) => {
  try {
    let orders = await ordersdb.find({ email: req.body.email }).exec();
    console.log(orders);
    if (orders.length===0) throw new Error("not found user order");
    res.render("manageorder", {
      orders,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/manageorder");
  }
};

module.exports = {
  getmange,
  update,
  findstatus,
  search,
};
