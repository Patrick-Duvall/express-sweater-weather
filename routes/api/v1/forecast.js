var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Forecast = require('../../../pojos/forecast');
const bcrypt = require('bcrypt');
require('dotenv').config()
const fetch = require('node-fetch')

router.get("/", function (req, res) {
  if(req.body.api_key){
  let location = req.query.location
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_KEY}`)
  .then(response => {
    return response.json()})
  .then(latLng => {
    let lat  = latLng.results[0].geometry.location.lat
    let lng  = latLng.results[0].geometry.location.lng
    fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lng}`)
    .then(response => {
      return response.json()})
      .then(forecast => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(new Forecast(location, forecast)));
    })
  })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error })
    });
  } else{
  res.status(409).send()}
});

module.exports = router
