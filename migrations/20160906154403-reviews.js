'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('reviews', {
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
        },
        onDelete: 'cascade'
      },
      text: Sequelize.STRING,
      rating: Sequelize.INTEGER
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('reviews');
  }
};
