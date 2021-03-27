const express = require('express');
const filmModel = require('../models/film.model');
const filmCreationSchema = require("../schemas/film.json");
const filmUpdationSchema = require("../schemas/update_film.json")

const validate = require('../middlewares/validate.mdw');


const router = express.Router();

// Get all films
router.get('/', async (req, res) => {
  const list = await filmModel.all();
  res.json(list);
})

// Get a film detail
router.get('/:id', async (req, res) => {
  const id = req.params.id || 0;
  const film = await filmModel.getFilmDetail(id);
  if (film === null) {
    return res.status(204).end();
  }
  res.json(film);
})

//Create a film
router.post('/', validate(filmCreationSchema), async (req, res) => {
  let film = req.body;

  const ids = await filmModel.add(film);
  console.log(ids);

  film.film_id = ids[0];

  res.status(201).json(film);
})

//Update a film
router.patch('/:id', validate(filmUpdationSchema), async (req, res) => {
  const film_id = req.params.id || 0;
  const values = req.body;

  // console.log(film_id);
  // console.log(values);

  const ret = await filmModel.update(film_id, values);

  return res.json(ret);
})

//delete a film
router.delete('/:id', async (req, res) => {
  const film_id = req.params.id || 0;

  const count = await filmModel.delete(film_id);
  if(!count) {
    return res.status(404).end();
  }

  res.json(count);
})


module.exports = router;