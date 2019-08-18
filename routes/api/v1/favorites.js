var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Forecast = require('../../../pojos/forecast');
const bcrypt = require('bcrypt');
require('dotenv').config()
const fetch = require('node-fetch')

router.post("/", function (req, res){
  User.findOne({
      where: {
        api_key: req.body.api_key
      }
    })
    .then(user => {
      if (!user){
        console.log("N");
        res.status(409).send()
      } else {
        console.log("Y")
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({message: "Denver, CO has been added to your favorites"}));
    }
  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router
