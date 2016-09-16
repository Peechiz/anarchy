'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'skaters',
      'rankId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ranks',
          key: 'id'
        },
        defaultValue: 1,
      }
    ).then(()=>{
      return queryInterface.removeColumn('skaters', 'rank')
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'skaters',
      'rank',
      {
        type: Sequelize.STRING
      }
    ).then(()=>{
      return queryInterface.removeColumn('skaters', 'rankId')
    })
  }
};
