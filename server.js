const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const GoogleStrategy = require("./strategies/google");
const LocalStrategy = require("./strategies/local");

const usersAuth = require("./routes/auth");
const signupRouter = require("./routes/signup");
const usersRouter = require("./routes/user");

app.use(passport.initialize());
passport.use(GoogleStrategy);
passport.use(LocalStrategy);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/google", usersAuth);
app.use("/signup", signupRouter);
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = app;
