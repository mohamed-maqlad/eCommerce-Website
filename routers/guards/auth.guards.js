//check user login

let isAuth = (req, res, nxt) => {
  try {
    if (req.session.userId) return nxt();
    res.redirect("/login");
  } catch (error) {
    console.log(error)
  }
};


let notAuth = (req, res, nxt) => {
    try {
      if (!req.session.userId) return nxt();
      res.redirect("/");
    } catch (error) {
      console.log(error)
    }
  };

module.exports = {
    isAuth,
    notAuth
}
