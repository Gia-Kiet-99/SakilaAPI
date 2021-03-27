const db = require('../utils/db');

module.exports = {
  all() {
    // return db('film');
    return db("film");
  },

  async getFilmDetail(id) {
    try {
      const films = await db('film').where('film_id', id);
      if (films.length === 0) {
        return null;
      }
      return films[0];
    } catch (error) {
      console.error(error.toString());
      return null;
    }
  },

  add(film) {
    return db('film').insert(film);
  },

  update(film_id, values) {
    if (Object.keys(values).length === 0 && values.constructor === Object) {
      return null;
    }
    try {
      return db('film').where({film_id: film_id}).update({...values});
    } catch (error) {
      console.error(error)
      return null;
    }
  },

  delete(film_id) {
    return db('film').delete().where({film_id: film_id});
  }
}