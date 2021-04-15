const express = require('express');
const router = express.Router();

const userModel = require('../models/user.model')
const validate = require('../middlewares/validate.mdw')
const authSchema = require('../schemas/auth.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomString = require('randomstring')

router.post('/', validate(authSchema), async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.singleByUsername(username);

  if (user === null || !bcrypt.compareSync(password, user.password)) {
    return res.json({
      authenticated: false
    })
  }

  const payload = {
    userId: user.user_id
  }
  const opts = {
    expiresIn: 60 * 10 //second
  }

  const accessToken = jwt.sign(payload, process.env.SECRET_KEY, opts);
  const refreshToken = randomString.generate(80);

  await userModel.patchRFToken(user.user_id, refreshToken);

  res.json({
    authenticated: true,
    accessToken,
    refreshToken
  })
})

module.exports = router;