var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*POST new user*/
router.post("/", function (req, res){
  user =  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user){
        res.status(409).send()
      } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result === true){
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify({api_key: user.api_key}));
        } else{
          res.status(409).send()
        }
      })
    }
  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router
