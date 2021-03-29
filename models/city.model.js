const db = require('../utils/db')

module.exports = {
  all() {
    return db('city')
  },

  async single(city_id) {
    try {
      const cities = await db('city').where({ city_id: city_id });
      if (cities.length > 0) {
        return cities[0]
      }
    } catch (error) {
      console.error(error)
    }
    return null
  },

  async add(city) {
    let result = {};
    try {
      const ids = await db('city').insert(city);
      if (ids.length > 0) {
        result.id = ids[0];
      }
    } catch (error) {
      console.error(error.toString())
      result.message = error.toString();
    }
    return result;
  },

  async update(city_id, values) {
    let result = {};
    try {
      const count = await db('city').where({ city_id: city_id }).update({ ...values });
      if (count > 0) {
        result.count = count;
      }
    } catch (error) {
      console.error(error.toString())
      result.message = error.toString();
    }
    return result;
  },

  delete(city_id) {
    return db('city').delete().where({city_id: city_id});
  }
}