const express = require('express')
const router = express.Router()

const categoryModel = require('../models/category.model')
const validate = require('../middlewares/validate.mdw')
const categorySchema = require('../schemas/category.json')

router.get('/', async (req, res) => {
  const categoryList = await categoryModel.all();
  res.json(categoryList);
})

router.get('/:id', async (req, res) => {
  const category_id = req.params.id || 0;
  const category = await categoryModel.single(category_id);
  if (!category) {
    return res.status(204).end();
  }
  res.json(category);
})

router.post('/', validate(categorySchema), async (req, res) => {
  const category = req.body;
  const ids = await categoryModel.add(category);

  category.category_id = ids[0];
  res.status(201).json(category);
})

router.patch('/:id', validate(categorySchema), async (req, res) => {
  const category_id = req.params.id || 0;
  const values = req.body;
  const count = await categoryModel.update(category_id, values);

  if (count > 0) {
    return res.json(count)
  }
  res.status(204).end();
})

router.delete('/:id', async (req, res) => {
  const category_id = req.params.id || 0;
  const count = await categoryModel.delete(category_id);

  if (count > 0) {
    return res.json(count);
  }
  res.status(204).end();
})


module.exports = router;