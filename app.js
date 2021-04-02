const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
require('express-async-errors');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.json({
    message: 'Hello from Sakila API'
  });
})

app.use('/api/films', require('./routes/film.route'));
app.use('/api/actors', require('./routes/actor.route'));
app.use('/api/countries', require('./routes/country.route'));
app.use('/api/cities', require('./routes/city.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/languages', require('./routes/language.route'));

app.get('/error', function (req, res) {
  throw new Error("Test error");
})

app.use(function (req, res, next) {
  res.status(404).json({
    error_message: "Endpoint not found!"
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ error_message: "Something broke!" })
})

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
})