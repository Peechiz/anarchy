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
        type: Sequelize.INTEGER,
        references: {
            model: 'skaters',
            key: 'id'
        },
        onDelete: 'cascade'
      },
      gear_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'gear',
          key: 'id'
        }
      },
      is_current: Sequelize.BOOLEAN
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('skaters_gear')
  }
};
