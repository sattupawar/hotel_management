console.log("starting");
const express = require("express");
const app = express();
// lets import db.js file or db connection
const db = require("./db");
const bodyParser = require("body-parser");
// add middle ware to extract data from client body and it helps to convert extract body data format to javascript ojects
app.use(bodyParser.json());
app.use(express.json());
require("dotenv").config()
// ---------------------------------------------------

// Person model to interact with database :
// const Person = require("./model/Person");
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);


// ---------------------------------------------------
// port :
const PORT=process.env.PORT 
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
