// const product = require("../models/products");

// const mongoose = require("mongoose");
// require("dotenv").config;

// const DB_URI = process.env.DB_URI;

// const con = async (req,res,nxt) => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/e-commerc");
//     console.log("connect");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(4);
//   }
// };

// const prodectes = async () => {
//   [
//     new product({
//       path: "/imeges/ch1.jpeg",
//       category: "clothes",
//       description: "clothes",
//       price: 200,
//       name: "clothes",
//     }),
//     new product({
//       path: "/imeges/ch2.jpg",
//       category: "clothes",
//       description: "clothes ",
//       price: 200,
//       name: "clothes",
//     }),
//     new product({
//       path: "/imeges/ch3.jpg",
//       category: "clothes",
//       description: "clothes ",
//       price: 200,
//       name: "clothes",
//     }),
//     new product({
//       path: "/imeges/iphone1.jpg",
//       category: "phones",
//       description: "iphone pohne",
//       price: 200,
//       name: "ipone11",
//     }),
//     new product({
//       path: "/imeges/iphone2.jpeg",
//       category: "phones",
//       description: "iphone pohne",
//       price: 203,
//       name: "ipone12",
//     }),
//     new product({
//       path: "/imeges/iphone3.jpeg",
//       category: "phones",
//       description: "iphone pohne",
//       price: 200,
//       name: "ipone13",
//     }),
//     new product({
//       path: "/imeges/iphone4.jpeg",
//       category: "phones",
//       description: "iphone pohne",
//       price: 200,
//       name: "ipone14",
//     }),
//   ];
// };

// const save = async () => {
//   let don = 0;
//   for (let i = 0; i < prodectes.length; i++) {
//     prodectes[i].save();
//     console.log(`SAVES${prodectes}`);
//     don++;
//     if (don === prodectes.length) {
//       mongoose.disconnect();
//     }
//   }
// };
// con();
// prodectes();
// save();

const product = require("../models/products");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerc")
  .then(() => {
    console.log("conect");
  })
  .catch((err) => {
    console.log(err);
  });

const products = [
    new product({
      image: "/ch1.jpeg",
      category: "clothes",
      description: "clothes",
      price: 200,
      name: "clothes",
    }),
    new product({
        image: "/ch2.jpg",
      category: "clothes",
      description: "clothes ",
      price: 200,
      name: "clothes",
    }),
    new product({
        image: "/ch3.jpg",
      category: "clothes",
      description: "clothes ",
      price: 200,
      name: "clothes",
    }),
    new product({
        image: "/iphone1.jpg",
      category: "phones",
      description: "iphone pohne",
      price: 200,
      name: "ipone11",
    }),
    new product({
        image: "/iphone2.jpeg",
      category: "phones",
      description: "iphone pohne",
      price: 203,
      name: "ipone12",
    }),
    new product({
        image: "/iphone3.jpeg",
      category: "phones",
      description: "iphone pohne",
      price: 200,
      name: "ipone13",
    }),
    new product({
        image: "/iphone4.jpeg",
      category: "phones",
      description: "iphone pohne",
      price: 200,
      name: "ipone14",
    }),
  ]


var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save().then(()=>{
        done++;
        if (done === products.length) {
          mongoose.disconnect();
        }}).catch((e)=>{console.log(e)})
}
