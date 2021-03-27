const express = require('express');
const router = express.Router();

const actorModel = require('../models/actor.model');
const actorCreationSchema = require('../schemas/actor.json');
const actorUpdationSchema = require('../schemas/update_actor.json')
const validate = require('../middlewares/validate.mdw');


router.get('/', async (req, res) => {
  const listActor = await actorModel.all();
  res.json(listActor);
})

router.get('/:id', async (req, res) => {
  const actor_id = req.params.id || 0;
  const actor = await actorModel.single(actor_id);

  if (actor === null) {
    return res.status(204).end();
  }
  res.json(actor);
})

router.post('/', require('../middlewares/validate.mdw')(actorCreationSchema), async (req, res) => {
  const actor = req.body;
  const ids = await actorModel.add(actor)

  actor.actor_id = ids[0];
  res.status(201).json(actor);

})

router.patch('/:id', validate(actorUpdationSchema), async (req, res) => {
  const actor_id = req.params.id || 0;
  const values = req.body;

  const count = await actorModel.update(actor_id, values);
  res.json(count);
})

router.delete('/:id', async (req, res) => {
  const actor_id = req.params.id || 0;
  const count = await actorModel.delete(actor_id);
  
  res.json(count);
})

module.exports = router;