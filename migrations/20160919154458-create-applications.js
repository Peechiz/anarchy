'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('applications', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skaterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'skaters',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      xp: {
        type: Sequelize.TEXT
      },
      hasSkates: {
        type: Sequelize.BOOLEAN
      },
      hasPads: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('applications');
  }
};
