const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.json({
    message: 'Hello from Sakila API'
  });
})

app.use('/api/films', require('./routes/film.route'));

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Sakila api is running at http://localhost:${PORT}`);
})