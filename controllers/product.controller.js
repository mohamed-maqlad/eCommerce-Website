const Product = require("../models/products");
// const productSchema = require("../models/products");

// let getProdect = async (req, res, nxt) => {
//   try {
//     let prodect = await Product.findById(req.params.id).exec();
//     if (!prodect) throw new Error("Not found product");
//     res.render("product", { prodect, isUser:true,});
//   } catch (error) {
//     console.log(error.message);
//     res.redirect("/product");
//   }
// };

// let getFristProduct = async (req, res) => {
//   try {
//     let product = await Product.findOne().exec();
//     if (!product) return res.status(404).send("not found!");
//     res.status(200).redirect("/product", { product, isUser: true });
//   } catch (error) {
//     console.log(error.message);
//     res.redirect("/product");
//   }
// };

// let getProduct = async (req, res, nxt) => {
//   try {
//     let product = await Product.find(req.params.id);
//     if (!product) throw new Error("not found iteam");
//     res.render("product", {
//       product: product,
//       // isUser: req.session.userId,
//       isUser:true,
//       isAdmin:flash,
//       // error: req.flash("error"),
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.redirect("/product");
//   }
// };

let getProduct = async (req, res, nxt) => {
  try {
    let product = await Product.findById(req.params.id).exec();
    if (!product) throw new Error("not found prodct");
    // console.log(product);
    res.render("product", {
      product: product,
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin,
      error: req.flash("errorproduct"),
      errorAmount: req.flash("errorAmount"),
      success: req.flash("success")
    });
  } catch (error) {
    console.log(error.message);
    req.flash("errorproduct", error.message);
    res.redirect("/");
  }
};

module.exports = {
  getProduct,
};
