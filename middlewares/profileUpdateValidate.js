const validator = require("../utils/updateProfile");

module.exports = async (req, res, nxt) => {
  try {
    let valid = validator(req.body);
    if (valid) {
      req.valid = 1;
      nxt();
    } else {
      throw new Error(" forbidden please enter all field");
    }
  } catch (error) {
    req.flash('error', error.message);
    console.log(error.message)
    res.redirect("/profile");
  }
};