const db = require('../utils/db');

module.exports = {
  all() {
    return db('film');
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
  }
}