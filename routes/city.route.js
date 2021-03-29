const express = require('express');
const router = express.Router();

const cityModel = require('../models/city.model');
const citySchema = require('../schemas/city.json');
const cityUpdationSchema = require('../schemas/updation_city.json');
const validate = require('../middlewares/validate.mdw');


router.get('/', async (req, res) => {
  const cities = await cityModel.all();
  res.json(cities);
})

router.get('/:id', async (req, res) => {
  const city_id = req.params.id || 0;
  const city = await cityModel.single(city_id);

  if (city === null) {
    return res.status(204).end();
  }
  res.json(city);
})

router.post('/', validate(citySchema), async (req, res) => {
  const city = req.body;
  const result = await cityModel.add(city);

  if (result.id) {
    city.city_id = result.id;
    res.status(201).json(city);
  } else {
    res.status(400).json(result.message);
  }
})

router.patch('/:id', validate(cityUpdationSchema), async (req, res) => {
  const city_id = req.params.id || 0;
  const values = req.body;

  const result = await cityModel.update(city_id, values);
  if (result.count && result.count > 0) {
    res.json(result.count)
  } else {
    res.status(400).json(result.message);
  }
})

router.delete('/:id', async (req, res) => {
  const city_id = req.params.id || 0;
  const count = await cityModel.delete(city_id);

  if (count === 0) {
    return res.status(204).end();
  }
  res.json(count);
})


module.exports = router;