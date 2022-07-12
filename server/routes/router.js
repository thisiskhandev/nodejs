const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.get("/", (req, res) => {
  console.log("connect");
});

router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    res.status(404).send("please fill the data");
  }
  try {
    // if user is available
    // aik database wala email ha dusra wala jo humne bheja ha
    const preuser = await users.findOne({ email: email });
    console.log(preuser);
    if (preuser) {
      res.status(404).send("this user is already present!");
    } else {
      // if user is first time filling the data
      const adduser = new users({ name, email, mobile });
      // adding data into database
      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
