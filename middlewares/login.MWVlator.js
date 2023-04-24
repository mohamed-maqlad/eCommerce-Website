const validator = require("../utils/authLoginValidator");

module.exports = async (req, res, nxt) => {
  try {
    let valid = validator(req.body);
    if (valid) {
      req.valid = 1;
      nxt();
    } else {
      throw new Error(" forbidden please enter valid email or password");
    }
  } catch (error) {
    req.flash('error', error.message);
    res.redirect("/login");
  }
};
