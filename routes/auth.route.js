const express = require('express');
const router = express.Router();

const userModel = require('../models/user.model')
const validate = require('../middlewares/validate.mdw')
const authSchema = require('../schemas/auth.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const randomString = require('randomstring')
const authMDW = require('../middlewares/auth.mdw')

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

router.post("/refresh", authMDW, async (req, res) => {
  const { refreshToken } = req.body;
  const { userId } = req.accessTokenPayload;

  const user = await userModel.single(userId);
  if (!user || user.rfToken !== refreshToken) {
    return res.status(401).json({
      error_message: "Refresh token is revoked!"
    })
  }

  const payload = {
    userId: user.user_id
  };
  const opts = {
    expiresIn: 60 * 10
  }
  const newAccessToken = jwt.sign(payload, process.env.SECRET_KEY, opts);
  // console.log(accessToken);

  res.json({accessToken: newAccessToken});
})

module.exports = router;