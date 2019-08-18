'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert("Users", [
        {
          id: 1,
          email: "user@gmail.com",
          password: 'abc123',
          api_key: '123abc',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Users', null, {})
    ]);
  }
};
