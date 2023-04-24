const cartItem = require("../models/cart");
const usersdb = require("../models/auth");
const orderdb = require("../models/order");
const prodctdb = require("../models/products");

//add new item for cart
let addNewItem = async (req, res, nxt) => {
  try {
    // let usercart = await cartItem.find({userId: req.session.userId});
    // console.log(`usercart${usercart}`);
    // if (usercart) {
    //   let product = await cartItem.find({productId: req.body.productId},{amount:1});
    //   console.log(`amount${product.amount}`);
    // }

    // if (!usercart) {
    let amount = req.body.amount;
    const product = await cartItem.find({productId: req.body.productId});
    if(product.length !== 0){
      const newAmount = product[0].amount+1
      await cartItem.findOneAndUpdate(
        {productId: req.body.productId},
        {amount: newAmount, timestamp: Date.now() }
      );

    req.flash("success", "add product to cart successfuly");
    res.redirect(req.body.redirectTo);
    return 0;
    }
    if (amount < 1) throw new Error("Please enter amount greter than 0");

    let newItem = new cartItem({
      name: req.body.name,
      price: req.body.price,
      amount: req.body.amount,
      userId: req.session.userId,
      productId: req.body.productId,
      timestamp: Date.now(),
    });
    await newItem.save();
    req.flash("success", "add product to cart successfuly");
    res.redirect(req.body.redirectTo);
  } catch (error) {
    console.log(error.message);
    req.flash("errorAmount", error.message);
    res.redirect(req.body.redirectTo);
  }
};

//get item byuserid form cart

let getItemCart = async (req, res, nxt) => {
  try {
    let item = await cartItem
      .find({ userId: req.session.userId }, {}, { sort: { timestamp: -1 } })
      .exec();
    if (!item) throw new Error("There is no item");
    res.render("cart", {
      item,
      isUser: true,
      isAdmin: req.session.isAdmin,
      error: req.flash("error"),
      success: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/cart");
  }
};

// update item

let editItem = async (req, res, nxt) => {
  try {
    let item = await cartItem.findByIdAndUpdate(
      { _id: req.body.cartId },
      { amount: req.body.amount, timestamp: Date.now() }
    );
    if (!item) throw new Error("not found update");
    req.flash("success", "updated successfully");
    res.redirect("/cart");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/cart");
  }
};

//delet itme

let deleteItem = async (req, res, nxt) => {
  try {
    let item = await cartItem
      .findByIdAndDelete({ _id: req.body.cartId })
      .exec();
    if (!item) throw new Error("can not foun delete");
    req.flash("success", "Delete successfully");
    res.redirect("/cart");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/cart");
  }
};

//delete cart

let deletcart = async (req, res, nxt) => {
  try {
    let cart = await cartItem.deleteMany(req.body.cartId).exec();
    if (!cart) throw new Error("not found cart");
    req.flash("success", "Delete All successfully");
    res.redirect("/cart");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/cart");
  }
};

let saveOreder = async (req, res, nxt) => {
  try {
    let user = await usersdb.findById({ _id: req.session.userId });
    if (!user.email || !user.address)
      throw new Error("please update your profile email and address");
    let userCart = await cartItem.find({ userId: req.session.userId });
    // console.log(user.name);
    // console.log(userCart.name);

    let order = new orderdb({
      email: user.email,
      address: user.address,
      cart: userCart,
      orderId: req.session.userId,
      cost: req.body.cost,
      totalamount: req.body.amount,
    });
    await order.save();
    await cartItem.deleteMany({ userId: req.session.userId });
    req.flash("success", "saved to order successfuly");
    res.redirect("/order");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/profile");
  }
};

module.exports = {
  addNewItem,
  getItemCart,
  editItem,
  deleteItem,
  deletcart,
  saveOreder,
};
