const Boom = require('boom');

module.exports = [{
  method: 'GET',
  path: '/api/skaters',
  config: {
    handler: function(req, res) {
      const Skaters = req.server.app.models.Skaters;
      Skaters.findAll().then((records) => {
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
  path: '/api/skaters/{id}',
  config: {
    handler: function(req,res){
      const Skaters = req.server.app.models.Skaters;
      Skaters.findById(req.params.id).then(skater=>{
        res(skater.toJSON().getSkater)
      })
    }
  }
},{
  method: 'GET',
  path: '/api/skaters/{id}/skaters_gears',
  handler: function(req,res){
    const SkatersGears = req.server.app.models.SkatersGears
    SkatersGears.findAll({
      where: {skaterId: req.params.id}
    }).then(data=>{
      res(data)
    })
  }
},{
  method: 'GET',
  path: '/api/skater/{id}/gears/',
  handler: function(req,res){
    const Gears = req.server.app.models.Gears
    const SkatersGears = req.server.app.models.SkatersGears
    Gears.findeAll({ includes: {}}).then(data=>{
      res(data)
    })
  }
},{
  method: 'GET',
  path: '/api/profile/{id}',
  config: {
    handler: function(req, res) {
      const Models = req.server.app.models
      Models.Skaters.findOne(
        {
        attributes: [
          'userName',
          'derbyName',
          'number',
          'favPosition',
          'photo',
          'rank',
          'summary'],
        include: [{
          model: Models.SkatersGears,
          attributes: ['isCurrent'],
          where: {
            skaterId: req.params.id
          },
          include: [{
            model: Models.Gears,
            attributes: ['name','type'],
            include: [{
              model: Models.Brands,
              attributes: ['name']
            },{
              model: Models.Reviews,
              attributes: ['text','rating']
            }]
          }]
        },{
          model: Models.Teams,
          attributes: ['teamName']
        }]
      }
    ).then(data => {
        if (data) {
          // data = data.toJSON();
          // var out = data.getSkater
          // out.gear = data.skaters_gears
          res(data.toJSON())
        } else {
          res(Boom.badRequest('skater not found'))
        }
      })
    }
  }
}]
