const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(function(name, password, done) {
  User.findOne({ name: name }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: "Nombre incorrecto" });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: "Contraseña incorrecta" });
    }
    return done(null, user);
  });
});
