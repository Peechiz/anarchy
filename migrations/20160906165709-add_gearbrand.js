'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeColumn('gears', 'brand').then(()=>{
      return queryInterface.addColumn(
        'gears',
        'brandId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'brands',
            key: 'id'
          },
          onDelete: 'cascade'
        }
      )
    })
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.removeColumn('gears','brandId').then(()=>{
      return queryInterface.addColumn(
        'gears',
        'brand',
        Sequelize.STRING
      )
    })
  }
};
