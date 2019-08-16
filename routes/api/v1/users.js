var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*POST new user*/
router.post("/", function (req, res) {
  let api_key = uuidv4()
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  User.create({
    email: req.body.email,
    password: hashedPassword,
    api_key: api_key
  })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({api_key: user.api_key}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router
