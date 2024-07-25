const express = require("express");
const router = express.Router();
const Person = require("./../model/Person");

router.post("/", async (req, res) => {
  try {
    // now data me vo sari information hogi jo data me hain
    const data = req.body;
    const newPerson = new Person(data);

    // now we need to store data in db
    // remember save function return a call back function :

    const person = await newPerson.save();
    console.log("save data", person);
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch successfully..", data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const personId = req.params.id;
    const replace = await Person.findByIdAndUpdate(personId, data, {
      // update document or data ko return karega
      new: true,
      // models person.js me jo mene schema banaya usko validate karega, vo variable required hain ya nhi bus vahi validate karta hain -> run mongoose validation
      runValidators: true,
    });

    // might be possible id is not found :
    if (!replace) {
      res.status(400).send("user not found");
    }
    res.status(200).json(replace);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    
    const result = await Person.findById(userId);

    if (!result) {
      res.status(404).send("user not found");
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/work/:type", async (req, res) => {
  try {
    const workType = req.params.type;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await Person.find({ work: workType });
      res.status(200).json(data);
    }
    console.log(workType);
    res.status(500).json({ workType: " not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    // specify which id data you want to delete:
    const personId = req.params.id;

    // find id and delete data :
    const result = await Person.findByIdAndDelete(personId);

    // might be possible person is not found in database :
    if (!result) {
      console.log(result);
      res.status(404).send("person not found");
    }
    res.status(200).send("delete data successfully...");
  } catch (error) {
    // res.status(500).json({ error: "Internal server error" });
    console.log(error);
    res.status(500).send("Error deleting person data :", error.message);
  }
});

module.exports = router;
