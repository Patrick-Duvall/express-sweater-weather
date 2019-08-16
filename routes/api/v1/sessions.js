var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Game.findAll({
//     where: {
//       id: req.params.id
//     }
//   })

/*POST new user*/
router.post("/", function (req, res){
  user =  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      console.log(user)
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify({api_key: user.api_key}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router
