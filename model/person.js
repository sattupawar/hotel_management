const mongoose = require("mongoose");

// define the person schema
const personSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
  mobile: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  // here i added email : unique : it not contains duplicates email : it only contains unique emails, if duplicates type it show errors
  address: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
});

//todo : By creating a model, you can interact with the database using the defined schema structure.
// now create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
