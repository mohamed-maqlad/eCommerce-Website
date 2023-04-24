// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// module.exports = (req, res, nxt) => {
//   const token = req.header("x-auth-token");
//   const secKey = process.env.secretkey;
//   if (!token) return res.status(401).send("access denied!!");
//   try {
//     const decodedPayLoad = jwt.verify(token, secKey);
//     if (!decodedPayLoad.adminRole)
//       return res.status(401).send("access denied!");
//     nxt();
//   } catch (err) {
//     res.status(400).send("Invalid token");
//   }
// };