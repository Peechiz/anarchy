'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeColumn('gear', 'brand').then(()=>{
      return queryInterface.addColumn(
        'gear',
        'brand_id',
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

    return queryInterface.removeColumn('gear','brand_id').then(()=>{
      return queryInterface.addColumn(
        'gear',
        'brand',
        Sequelize.STRING
      )
    })
  }
};
