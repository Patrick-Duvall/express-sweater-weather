'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.City, {
    through: 'UserCities',
    as: 'cities',
    foreignKey: 'userId',
    otherKey: 'cityId'
  });
  };
  return User;
};
