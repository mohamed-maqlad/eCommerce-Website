const productSchema = require("../models/products");

//get home product and make filter category

let getProduct = async (req, res) => {
  try {

    let valideCategory = ["clothes", "phones", "laptop"];
    let category = req.query.category;
    //   let category = req.body.category
    if (category && valideCategory.includes(category)) {
      let Product = await productSchema.find({ category: category }).exec();
      if (!Product) throw new Error("Not Found Products");
      console.log(Product);

      res.render("index", {
        Product: Product,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        error: req.flash("errorAmount"),
        errorPrduct: req.flash("errorproduct"),
        success: req.flash("success"),
        errororder:req.flash("errorOrder")
      });
    } else {
      try {
        console.log(req.session.userId);
        let Product = await productSchema.find({}).exec();
        if (!Product) throw new Error("Not Found Products");
        console.log(Product);
        res.render("index", {
          Product: Product,
          isUser: req.session.userId,
          isAdmin: req.session.isAdmin,
          error: req.flash("errorAmount"),
          errorPrduct: req.flash("errorproduct"),
          success: req.flash("success"),
          errororder:req.flash("errorOrder")
        });
      } catch (error) {
        console.log(error.message);
        req.flash("errorAmount", error.message);
        res.status(500).send("bad request");
      }
    }
  } catch (error) {
    console.log(error.message);
    req.flash("errorAmount", error.message);
    res.status(500).send("bad request");
  }
};

module.exports = {
  getProduct,
};
