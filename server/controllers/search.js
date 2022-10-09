let express = require('express');
let router = express.Router();

module.exports.processSearch = (req, res, next) => {
    res.send(req.body.city);
}
