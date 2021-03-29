const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'sakila',
    port: 3306
  },
  pool: {min: 0, max: 50}
});

module.exports = knex;