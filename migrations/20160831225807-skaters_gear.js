'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('skaters_gears',
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
      skaterId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'skaters',
            key: 'id'
        },
        onDelete: 'cascade'
      },
      gearId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'gears',
          key: 'id'
        }
      },
      isCurrent: Sequelize.BOOLEAN
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters_gears')
  }
};
