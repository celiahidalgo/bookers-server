const jwtValidator = require("../lib/jwt-validator");
const salt = process.env.JTW_KEY;

module.exports = async function (req, res, next) {
    try {
        const decoded = await jwtValidator(req.query.token, salt);
        req.userId = decoded;

        next();
    } catch (err) {
        return res.status(401).send();
    }
}