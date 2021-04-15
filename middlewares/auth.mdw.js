const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const accessToken = req.headers["x-access-token"];

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
      console.log("Decoded: ", decoded);
      req.accessTokenPayload = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        error_message: "Invalid access token!"
      })
    }
  } else {
    return res.status(400).json({
      error_message: "Access token not found!"
    })
  }

}