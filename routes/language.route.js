const express = require('express');
const router = express.Router();

const languageModel = require('../models/language.model');


router.get('/', async (req, res) => {
  const languages = await languageModel.all();
  res.json(languages);
})


module.exports = router;