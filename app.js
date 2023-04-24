const express = require("express");
const flash = require('connect-flash')
const path = require("path")
require("dotenv").config();
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
mongoose.pluralize(null);
const session = require("express-session")
const SessionStore = require("connect-mongodb-session")(session)



const homeRoter = require("./routers/home.router")
const productRouter = require("./routers/product.router")
const authRouter = require("./routers/auth.router")
const cartRouter = require("./routers/cart.router")
const adminRouter = require("./routers/admin.router")
const managePorductRouter = require("./routers/mangeProduct.router")
const profileRouter = require("./routers/profile.router")
const orderRouter = require("./routers/order.router")
const mangeorderRouter= require("./routers/mangeOrder.router")


const secret= process.env.secret
const port = process.env.port;
const DB_URI = process.env.DB_URI;

(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB Connected Sucess");
  } catch (e) {
    console.log(e.message);
    process.exit(4);
  }

  const store = new SessionStore({
    uri:DB_URI,
    collection:'session'
  })

  const app = express()
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use(express.static(path.join(__dirname,'public')))
    .use(express.static(path.join(__dirname,'imeges')))
    .use(flash())
    .use(session({
      secret:secret,
      saveUninitialized:false,
      store:store
    }))
    .set('view engine','ejs')
    .set('views','views')
    .use('/',homeRoter)
    .use('/',authRouter)
    .use('/',productRouter)
    .use('/',orderRouter)
    .use('/cart',cartRouter)
    .use('/admin',adminRouter)
    .use('/manageprodect',managePorductRouter)
    .use('/profile',profileRouter)
    .use('/manageorder',mangeorderRouter)

    .listen(port, () => {
      console.log(`Server is listening at :${port}`);
    });
})();
