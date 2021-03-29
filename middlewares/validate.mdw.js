const Ajv = require("ajv").default;

// const countryModel = require('../models/country.model')

// function checkForeignKey (schema, value) {

// }

module.exports = (schema) => (req, res, next) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  // const object = JSON.parse(schema);
  // if (object.hasOwnProperty('links')) {
  //   for (const link of object.links) {
  //     if (link.foreign_key in req.body) {
  //       checkForeignKey(object.title, req.body.foreign_key)
  //     }
  //   }
  // } else {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json(validate.errors);
    }
  // }

  next();
}