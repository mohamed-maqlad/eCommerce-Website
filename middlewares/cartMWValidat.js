const validator = require("../utils/cartValidation")

module.exports = async (req, res, nxt) => {
    try {
      let valid = validator(req.body.amount);
      if (valid) {
        req.valid = 1;
        nxt();
      } else {
        throw new Error("plese enter number for amount");
      }
    } catch (error) {
      req.flash('error', error.message);
      res.redirect("/");
    }
  };

  
  