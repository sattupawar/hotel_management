const mongoose = require("mongoose");
require("dotenv").config();

// define mongodb connection url :
// why need : because we have to connect node js to mongodb ;
// mongoose here is layer between node js application and mongodb ;
// we need to pass connection string :

// copy the following url from mongodb left side right click copy connection string
const mongoURL = process.env.MONGODB_URL_LOCAL;
// now time connect mongoose to mongodb

// const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose maintain a default connection object represent mongodb connection
const db = mongoose.connection;

// ab yaha pe connected ka matlab mongodb ko pata hain
// to jese mongodb connected hoga mongoose se following event trigger ho jayega
// it show ki ab connection ho chuka hain
// again yaha pe db ko "connection" "error" "disconnected" : iska matlab pata hain :
db.on("connected", () => {
  console.log("Connected to mongodb server");
});

db.on("error", (err) => {
  console.log("Mongodb connection error", err);
});

db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

// ye sab ho to gaya par mujhe db ki need ye file me nahi hain par server.js file me to mujhe isko export karna padega
module.exports = db;
// here db represent connection to mongodb
