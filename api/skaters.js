const Boom = require('boom');

module.exports = [{
  method: 'GET',
  path: '/api/skaters',
  config: {
    // auth: 'admin',
    handler: function(req, res) {
      const m = req.server.app.models;
      m.Skaters.findAll({
        attributes: { exclude: ['password'] },
        include: [{
          model: m.Ranks,
          attributes: ['name']
        },{
          model: m.Teams,
          attributes: ['teamName']
        }]
      }).then((records) => {
        // console.log(records.toJSON());
        const data = records.map(record => {
          return record.dataValues
        })
        res(data);
      })
    }
  }
},{
  method: 'GET',
  path: '/api/skaters/{id}/gear',
  config: {
    handler: function(req,res) {
      const m = req.server.app.models;
      m.SkatersGears.findAll({
        where: {skaterId: req.params.id},
        attributes: ['isCurrent','id'],
        include: [{
          model: m.Gears,
          attributes: ['name', 'type'],
          include: [{
            model: m.Brands,
            attributes: ['name']
          },{
            model: m.Reviews,
            attributes: ['rating', 'text']
          }]
        }]
      }).then(gear=>{
        res(gear.map(x => x.toJSON()))
      })
    }
  }
},{
  method: 'GET',
  path: '/api/skaters/{id}',
  config: {
    handler: function(req,res){
      const m = req.server.app.models;
      m.Skaters.findOne({
        where: {id: req.params.id},
        attributes: {exclude: ['password', 'admin']},
        include: [{
          model: m.Ranks,
          attributes: ['name']
        },{
          model: m.Teams,
          attributes: ['teamName']
        }]
      }).then(skater=>{
        res(skater.toJSON())
      })
    }
  }
}]
