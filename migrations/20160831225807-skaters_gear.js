'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('skaters_gear',
    {
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
      skater_id: {
        references: {
            model: 'skaters',
            key: 'id'
        },
      },
      gear_id: {
        references: {
          model: 'gear',
          key: 'id'
        }
      },
      brand: Sequelize.STRING,
      review: Sequelize.TEXT
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters_gear')
  }
};
