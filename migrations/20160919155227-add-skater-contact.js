'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'skaters',
      'tel',
      {
        type: Sequelize.STRING
      }
    ).then(()=>{
      return queryInterface.addColumn(
        'skaters',
        'email',
        {
          type: Sequelize.STRING
        }
      )
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('skaters', 'tel').then(()=>{
      return queryInterface.removeColumn('skaters', 'email')
    })
  }
};
