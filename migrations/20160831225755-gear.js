'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('gears', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      brand: Sequelize.STRING,
      name: Sequelize.STRING,
      type: Sequelize.STRING
    },
    {
      freezeTableName: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('gears');
  }
};
