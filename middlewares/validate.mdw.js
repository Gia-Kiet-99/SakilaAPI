const Ajv = require("ajv").default;

// const countryModel = require('../models/country.model')

// function checkForeignKey () {

// }

module.exports = (schema) => (req, res, next) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  // if (schema.hasOwnProperty('link')) {

  // } else {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json(validate.errors);
    }
  // }

  next();
}