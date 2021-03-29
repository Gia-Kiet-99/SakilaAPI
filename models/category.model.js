const db = require('../utils/db')

module.exports = {
  all() {
    return db('category');
  },

  async single(category_id) {
    try {
      const categories = await db('category').where({ category_id: category_id });
      if (categories.length > 0) {
        return categories[0];
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  },

  add(category) {
    return db('category').insert(category);
  },

  update(category_id, values) {
    return db('category').where({category_id: category_id}).update({...values});
  },

  delete(category_id) {
    return db('category').where({category_id: category_id}).delete();
  }
}