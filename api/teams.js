module.exports = [
  {
    method: 'GET',
    path: '/api/teams',
    config: {
      handler: function(req,res){
        console.log('in teams!');
        const m = req.server.app.models
        m.Teams.findAll({
          attributes: ['teamName'],
          include: [{
            model: m.Skaters,
            attributes: [
              'derbyName',
              'number',
              'photo'            ]
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
