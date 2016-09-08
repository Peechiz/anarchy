const Boom = require('boom');

module.exports = [
  {
    method: 'GET',
    path: '/api/skaters',
    config: {
      handler: function(req,res){
        const Skaters = req.server.app.models.Skaters;
        Skaters.findAll().then((records)=>{
          // console.log(records.toJSON());
          const data = records.map(record => {
            return record.dataValues
          })
          res(data);
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/skaters/{id}',
    config: {
      handler: function(req,res){
        const Skaters = req.server.app.models.Skaters;
        Skaters.findById(req.params.id).then(data=>{
          if (data){
            res(data.toJSON().getSkater)
          }
          else {
            res(Boom.badRequest('skater not found'))
          }
        })
      }
    }
  }
]
