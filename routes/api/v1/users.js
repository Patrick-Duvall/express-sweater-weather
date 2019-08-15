var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const uuidv4 = require('uuid/v4')

/*POST new user*/
/*POST new game*/
router.post("/", function (req, res) {
  let api_key = uuidv4()
  console.log(api_key)
  User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(user.api_key));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router
