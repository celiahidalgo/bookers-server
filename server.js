const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const app = express();
const GoogleStrategy = require("./strategies/google");
const jwtMiddleware = require("./middlewares/jwt");
const UserModel = require("./models/User");

app.use(passport.initialize());
passport.use(GoogleStrategy);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/google", passport.authenticate("google", { scope: ["profile"], session: false }));
app.get("/google/callback", passport.authenticate("google", { scope: ["profile"], session: false }), (req, res) => {

    jwt.sign({ userId: req.user._id }, process.env.JTW_KEY, (err, token) => {
        if (err) throw err;

        return res.redirect(`${process.env.CLIENT_URL}/chat.html?token=${token}`);
    })
});

app.get("/userdata", jwtMiddleware, async (req, res) => {
    const user = await UserModel.findOne({_id: req.userId});

    if (!user) {
        return res.status(400).send();
    }

    return res.status(200).json({user});
});

module.exports = app;

