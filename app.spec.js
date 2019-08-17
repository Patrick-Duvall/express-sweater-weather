var shell = require('shelljs')
var request = require('supertest')
var app = require('./app')
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt');
var User = require('./models').User;

describe('api',() => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe("Test Root Path", () => {
    test('should return 200',() => {
      return request(app).get('/').then(response => {
        expect(response.statusCode).toBe(200)
      });
    });
  });

  describe("Test Account Creation", () => {
    test('returns api key if unique email and passwords match', () => {
      return request(app)
      .post('/api/v1/users')
      .send({email: 'user@email.com',
      password: 'password',
      password_confirmation: 'password'}).then(response => {
        expect(response.statusCode).toBe(201)
        expect(Object.keys(response.body)).toContain('api_key')
      });
    });
    test('returns 409 if passwords dont match', () => {
      return request(app)
      .post('/api/v1/users')
      .send({email: 'user@email.com',
      password: 'password',
      password_confirmation: 'passwordbad'}).then(response => {
        expect(response.statusCode).toBe(409)
      });
    });
  });

  describe("Test Account Login", () => {
    test('returns api key if email matches pw', () => {
      let api_key = uuidv4()
      let hashedPassword = bcrypt.hashSync("password", 10);
      User.create({
        email: "user@email.com",
        password: hashedPassword,
        api_key: api_key
      })
      return request(app)
      .post('/api/v1/sessions')
      .send({email: 'user@email.com',
      password: 'password'})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Object.keys(response.body)).toContain('api_key')
      });
    });
    test('returns 409 if password does not match user', () => {
      let api_key = uuidv4()
      let hashedPassword = bcrypt.hashSync("password", 10);
      User.create({
        email: "user@email.com",
        password: hashedPassword,
        api_key: api_key
      })
      return request(app)
      .post('/api/v1/sessions')
      .send({email: 'user@email.com',
      password: 'assword'})
      .then(response => {
        expect(response.statusCode).toBe(409)
      });
    });
    test('returns 409 if no user', () => {
      return request(app)
      .post('/api/v1/sessions')
      .send({email: 'user@email.com',
      password: 'assword'})
      .then(response => {
        expect(response.statusCode).toBe(409)
      });
    });
  });

  describe("Test Forecast for a city ", () => {
    test('should return 200',() => {
      let api_key = uuidv4()
      let hashedPassword = bcrypt.hashSync("password", 10);
      User.create({
        email: "user@email.com",
        password: hashedPassword,
        api_key: api_key
      })
      return request(app).get('/api/v1/forecast?location=denver,co')
      .send({api_key: api_key})
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Object.keys(response.body)).toContain('location')
        expect(Object.keys(response.body)).toContain('currently')
        expect(Object.keys(response.body)).toContain('hourly')
        expect(Object.keys(response.body)).toContain('daily')
      });
    });
  });

});
