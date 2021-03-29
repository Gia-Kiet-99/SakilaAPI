const db = require('../utils/db')

module.exports = {
  all() {
    return db('country');
  },

  async single(country_id) {
    try {
      const countries = await db('country').where({ country_id: country_id })
      if (countries.length !== 0) {
        return countries[0]
      }
    } catch (error) {
      console.error(error)
    }
    return null;
  },

  add(country) {
    return db('country').insert(country);
  },

  update(country_id, values) {
    return db('country').where({ country_id: country_id }).update({ ...values })
  },

  delete(country_id) {
    return db('country').delete().where({ country_id: country_id })
  }
}