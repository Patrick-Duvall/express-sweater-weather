'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    City.belongsToMany(models.User, {
    through: 'UserCities',
    as: 'users',
    foreignKey: 'cityId',
    otherKey: 'userId'
  });
  };
  return City;
};
