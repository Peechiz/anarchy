module.exports = [
  {
    method: 'GET',
    path: '/api/ranks',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Ranks.findAll().then(ranks=>{
          res(ranks.map(x=>x.toJSON()));
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/ranks/{id}',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Ranks.findOne({
          attributes: ['name'],
          where: {id: req.params.id},
        }).then(team=>{
          res(team.toJSON());
        })
      }
    }
  }
]
