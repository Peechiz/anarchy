'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('skaters','team')
      .then(()=>{
        return queryInterface.addColumn(
          'skaters',
          'teamId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'teams',
              key: 'id'
            }
          }
        )
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('skaters', 'teamId')
      .then(()=>{
        return queryInterface.addColumn('skaters', 'team', Sequelize.STRING)
      })
  }
};
