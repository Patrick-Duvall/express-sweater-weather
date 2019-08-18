'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCity = sequelize.define('UserCity', {
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {});
  UserCity.associate = function(models) {
    // associations can be defined here
  };
  return UserCity;
};