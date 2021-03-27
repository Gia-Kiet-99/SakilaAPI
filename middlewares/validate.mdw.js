const Ajv = require("ajv").default;

module.exports = (schema) => (req, res, next) => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  // if(Object.keys(req.body).length === 0 || req.body === undefined || valid)

  if (!valid) {
    return res.status(400).json(validate.errors);
  }

  next();
}