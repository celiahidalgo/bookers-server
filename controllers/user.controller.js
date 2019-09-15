exports.userGET = async function (req, res) {

    const user = await UserModel.find({ user: req.user });
    if (!user) {
        return res.status(400).send();
    }
    return res.status(200).json({ user });
};
const generateJWT = require("../lib/jwt-creator");
const UserModel = require("../models/User");

exports.userPOST = async function (req, res) {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favorites: []
    });
    await user.save();
    console.log(user);
    const token = await generateJWT(user._id);
    return res.status(201).json({ "token": token });
};
exports.userIdLoginGET = async function (req, res) {
    const user = await UserModel.findById({ "_id": req.query.id });
    console.log(user)
    if (!user) {
        return res.status(400).send();
    }
    const token = await generateJWT(user._id);
    console.log(token)
    return res.status(200).setHeaders({ "token": token });
    // res.redirect(`${process.env.CLIENT_URL}/Home?token=${token}&id=${req.user._id}`);
};
exports.userIdGET = async function (req, res) {
    const user = await UserModel.findById({ "_id": req.params.id });
    if (!user) {
        return res.status(400).send();
    }
    if (!req.query.token) {
        const token = await generateJWT(user._id);
        return res.status(200).send({ user, "token": token });
        // return res.redirect(`${process.env.CLIENT_URL}/Home?token=${token}&id=${req.user._id}`);
    }
    else
        return res.status(200).json({ user });
};

exports.userFavGET = async function (req, res) {
    const user = await UserModel.findById({ "_id": req.params.id })
    const favorites = user.favorites
    if (favorites === null) {
        return res.status(404).send();
    }
    return res.status(200).json({ "favorites": favorites });
}

exports.userFavPUT = async function (req, res) {
    const favorites = await UserModel.findById({ "_id": req.params.id }).findOneAndUpdate({
        $push: { "favorites": req.body.favorites }
    });
    if (favorites.favorites === "undefined") {
        return res.status(404).send();
    };
    await favorites.save();
    return res.status(200).json({ "favorites": favorites.favorites });
};

exports.userFavDELETE = async function (req, res) {
    const favorites = await UserModel.findById({ "_id": req.params.id }).findOneAndUpdate({
        $pull: { "favorites": req.body.favorites }
    });
    if (favorites.favorites === "undefined") {
        return res.status(404).send();
    };
    await favorites.save();
    return res.status(200).json({ "favorites": favorites.favorites });
};

