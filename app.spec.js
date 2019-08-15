var shell = require('shelljs')
var request = require('supertest')
var app = require('./app')

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
  });


});
