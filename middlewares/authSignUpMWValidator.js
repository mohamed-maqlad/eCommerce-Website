const validator = require("../utils/authSignupValidator");

module.exports = async (req, res, nxt) => {
  try {
    let valid = validator(req.body);
    if (valid) {
      req.valid = 1;
      nxt();
    } else {
      throw new Error(" forbidden please enter valid email or password and name");
    }
  } catch (error) {
    req.flash('error', error.message);
    res.redirect("/signup");
  }
};
