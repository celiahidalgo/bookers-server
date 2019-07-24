const jwt = require("jsonwebtoken");

module.exports = function(token, salt) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, salt, (err, decoded) => {
      if (err) {
        return reject(new Error(err.message));
      }

      return resolve(decoded.userId);
    });
  });
};
