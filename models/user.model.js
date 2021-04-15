const db = require('../utils/db');

module.exports = {
  all() {
    return db('users');
  },

  async single(user_id) {
    const users = await db('users').where({user_id: user_id});
    if (users.length > 0) {
      return users[0];
    }

    return null;
  },

  async singleByUsername(username) {
    const users = await db('users').where({username: username});
    if (users.length > 0) return users[0];
    return null;
  },

  add(user) {
    return db('users').insert(user);
  },

  patchRFToken(user_id, refreshToken) {
    return db('users').where({user_id: user_id}).update({rfToken: refreshToken});
  }
}