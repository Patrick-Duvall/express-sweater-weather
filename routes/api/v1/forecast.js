var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
const bcrypt = require('bcrypt');
require('dotenv').config()
const fetch = require('node-fetch')

router.get("/", function (req, res) {
  let location = req.query.location
  console.log(process.env.GOOGLE_KEY)
  console.log(req.query.location)
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_KEY}`)
  .then(response => {
    return response.json()})
  .then(latLng => {
    let lat  = latLng.results[0].geometry.location.lat
    let lng  = latLng.results[0].geometry.location.lng
    console.log(lat)
    console.log(lng)
    
    // fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`)
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(latLng));
  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
});

module.exports = router
