var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');

router.get("/", function (req, res) {
    .then(forecast => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(forecast));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

module.exports = router
