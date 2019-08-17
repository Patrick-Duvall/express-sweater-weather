class Forecast {
  constructor(city, data) {
    this.location = city
    this.currently = data.currently
    this.hourly = data.hourly
    this.daily = data.daily
  }


}

module.exports = Forecast;
