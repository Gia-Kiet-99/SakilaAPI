const db = require('../utils/db');

module.exports = {
  all() {
    return db('actor');
  },

  async single(actor_id) {
    try {
      const actor = await db('actor').where({ actor_id: actor_id });
      if (actor.length !== 0) {
        return actor[0];
      }
    } catch (error) {
      console.error(error)
    }
    return null;
  },

  add(actor) {
    return db('actor').insert(actor);
  },

  update(actor_id, values) {
    if (Object.keys(values).length === 0 && values.constructor === Object) {
      return null;
    }
    return db('actor').where({actor_id: actor_id}).update({...values});
  },

  delete(actor_id) {
    return db('actor').delete().where({actor_id: actor_id});
  }
}