const productdb = require("../models/products");
const multer = require("multer");

//grt add product page
let getAddPorduct = async (req, res, nxt) => {
  try {
    res.render("AddProduct", {
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

//add new product

let addPoduct = async (req, res, nxt) => {
  try {
    let newProduct = new productdb({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.file.filename,
    });
    await newProduct.save();
    req.flash("success", "add new product successfully");
    res.redirect("/manageprodect");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/manageprodect");
  }
};

//get update page

let getUpdate = async (req, res, nxt) => {
  try {
    let product = await productdb.findById(req.params.id).exec();
    if (!product) throw new Error("not found product");
    res.render("updateproduct", {
      product,
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
// post update product
let postUpdate = async (req, res, nxt) => {
  try {
    let product = await productdb.findByIdAndUpdate(
      { _id: req.body.id },
      { name: req.body.name, price: req.body.price }
    );
    if (!product) throw new Error("not found")
    if (!req.body.name || !req.body.price)
      throw new Error("please enter name and price");

    req.flash("success", "updated successfully");
    res.redirect(req.body.productid);
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect(req.body.productid);
  }
};

//delete product

let deleteProduct = async (req, res, nxt) => {
  try {
    let product = await productdb
      .findByIdAndDelete({ _id: req.body.id })
      .exec();
    if (!product) throw new Error("not found product");
    req.flash("success", "Delete successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
    res.redirect("/");
  }
};

module.exports = {
  getAddPorduct,
  addPoduct,
  getUpdate,
  postUpdate,
  deleteProduct,
};
