var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt');

/*POST new user*/
router.post("/", function (req, res) {
  let api_key = uuidv4()
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  if (req.body.password === req.body.password_confirmation ) {
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
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(409).send({ error })
  }
});

module.exports = router
