# Express Sweater Weather
This project is a reimplementation of the project [Sweater Weather](https://github.com/Patrick-Duvall/sweater-weather) In order to learn NodeJS and sequelize. This Project is a RESTFUL API that uses Darksky and Google geolocation apis to deliver weather forecasts for a given city. It also supports user account creation and authentication using [bcrypt](https://www.npmjs.com/package/bcrypt) and [uuidv4](https://www.npmjs.com/package/uuidv4)

###### Built Using 
- Jest
- NodeJS
- Express
- PostGres
- Javascript

### DB Schema

![image](https://user-images.githubusercontent.com/35322570/63269397-5c697500-c253-11e9-884d-c404417042c6.png)
### Initial Setup

To install on your local machine
- `git clone https://github.com/Patrick-Duvall/express-sweater-weather`
- `npm install` to update dependencies
- To expiriment you will need your own [Darksky](https://darksky.net/dev) and [Google](https://developers.google.com/maps/documentation/javascript/get-api-key) API keys

### Running Tests
Testing is done using jest. To run the test suite run `npm test`

### How to Use
Express Sweater Weather supports the following endpoints
##### 1. Account Creation
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
##### Response
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```


##### 2. Login
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```
##### Response
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```
##### 3. Forecast For a City
Requirements
- API key must be sent
- If no API key sent returns 409
```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response
Response returns 48 hourly objects and 10  daily objects
```
{
   "location": "denver,co",
    "currently": {
        "time": 1566163229,
        "summary": "Clear",
        "icon": "clear-day",
        "nearestStormDistance": 234,
        "nearestStormBearing": 124,
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 86.28,
        "apparentTemperature": 86.28,
        "dewPoint": 43.31,
        "humidity": 0.22,
        "pressure": 1008.37,
        "windSpeed": 5.29,
        "windGust": 5.57,
        "windBearing": 82,
        "cloudCover": 0.11,
        "uvIndex": 7,
        "visibility": 10,
        "ozone": 288.5
        },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```
##### 4. City Favorites
Requirements
- API key must be sent
- If no API key sent returns 409
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
##### Successful Response
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

### Known issues
- User email validations are only supported at controller level and should be added to user level
- Currently each request makes a Darksky and Google APIcall, should figure out a way to attach forecasts to cities.

