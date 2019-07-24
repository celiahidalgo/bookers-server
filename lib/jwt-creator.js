const jwt = require("jsonwebtoken");
const salt = process.env.JWT_KEY;

// Genera el token para signup convencional  y Google
module.exports = function generateJWT(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(userId.toJSON(), salt, (err, token) => {
      if (err) {
        return reject(err);
      }
      console.log(token);
      return resolve(token);
    });
  });
};
