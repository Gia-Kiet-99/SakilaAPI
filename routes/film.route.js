const express = require('express');
const filmModel = require('../models/film.model');

const router = express.Router();


router.get('/', async (req, res) => {
  const list = await filmModel.all();
  res.json(list);
})

router.get('/:id', async (req, res) => {
  const id = req.params.id || 0;
  const film = await filmModel.getFilmDetail(id);
  if (film === null) {
    return res.status(204).end();
  }
  res.json(film);
})



const schema = require("../schemas/film.json")

router.post('/', require('../middlewares/validate.mdw')(schema), async (req, res) => {
  let film = req.body;

  const ids = await filmModel.add(film);
  console.log(ids);

  film.film_id = ids[0];

  res.status(201).json(film);
})


module.exports = router;