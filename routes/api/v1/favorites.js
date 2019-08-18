var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var City = require('../../../models').City;
var UserCity = require('../../../models').UserCity;
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
        console.log(user)
        res.status(409).send()
      } else {
        let city = req.body.location.split(", ")[0]
        let state = req.body.location.split(", ")[1]
        City.findOrCreate({
          where:{name: city,
          state: state}
        })
        .then( city => {
          console.log(city)
          // UserCity.create({
          //   cityId: city.id,
          //   userId: user.id
          // });
        // });
        // .then( usercity =>{
          // console.log(usercity)
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({message: `${req.body.location} has been added to your favorites`}));
      });
    }
  });
    // .catch(error => {
    //   res.setHeader("Content-Type", "application/json");
    //   res.status(500).send({ error });
    // });
});

module.exports = router
