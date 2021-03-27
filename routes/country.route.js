const express = require('express')
const router = express.Router();

const countryModel = require('../models/country.model')
const validate = require('../middlewares/validate.mdw')
const countrySchema = require('../schemas/country.json')

router.get('/', async (req, res) => {
  const countryList = await countryModel.all();
  res.json(countryList);
})

router.get('/:id', async (req, res) => {
  const country_id = req.params.id || 0;
  const country = await countryModel.single(country_id);
  if (country === null) {
    return res.status(204).end();
  }
  res.json(country)
})

router.post('/', validate(countrySchema), async (req, res) => {
  const country = req.body;
  const ids = await countryModel.add(country)

  country.country_id = ids[0];
  res.json(country);
})

router.patch('/:id', validate(countrySchema), async (req, res) => {
  const country_id = req.params.id || 0
  const values = req.body

  const count = await countryModel.update(country_id, values)
  if (count === 0) {
    return res.status(204).end();
  }
  res.json(count)
})

router.delete('/:id', async (req, res) => {
  const country_id = req.params.id || 0
  const count = await countryModel.delete(country_id)
  if (count === 0) {
    return res.status(204).end()
  }
  res.json(count)
})

module.exports = router;