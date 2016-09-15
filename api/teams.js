module.exports = [
  {
    method: 'GET',
    path: '/api/teams',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Teams.findAll({
          attributes: ['teamName', 'id'],
          include: [{
            model: m.Skaters,
            attributes: [
              'derbyName',
              'id',
              'number',
              'photo'
            ]
          }]
        }).then(teams=>{
          res(teams.map(x=>x.toJSON()));
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/teams/{id}',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Teams.findOne({
          attributes: ['teamName'],
          where: {id: req.params.id},
          include: [{
            model: m.Skaters,
            attributes: [
              'derbyName',
              'number',
              'photo'            ]
          }]
        }).then(team=>{
          res(team.toJSON());
        })
      }
    }
  }
]
