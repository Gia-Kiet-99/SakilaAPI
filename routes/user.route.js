const express = require("express")
const router = express.Router();

const userModel = require("../models/user.model")
const userSchema = require("../schemas/user.json")
const validate = require('../middlewares/validate.mdw')
const bcrypt = require('bcryptjs')

let salt = bcrypt.genSaltSync(10);

router.get("/", async (req, res) => {
  const users = await userModel.all();
  res.json(users);
})

router.post("/", validate(userSchema), async (req, res) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password, salt);
  const ids = await userModel.add(user);
  user.user_id = ids[0];
  delete user.password;

  res.status(201).json(user);
})


module.exports = router;