module.exports = [
  {
    method: 'GET',
    path: '/api/reviews',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Reviews.findAll({
          include: [{
            model: m.Skaters,
            attributes: [
              'derbyName',
              'number',
              'photo'            ]
          }]
        }).then(reviews=>{
          res(reviews.map(x=>x.toJSON()));
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/reviews/{id}',
    config: {
      handler: function(req,res){
        const m = req.server.app.models
        m.Reviews.findOne({
          where: {id: req.params.id},
          include: [{
            model: m.Skaters,
            attributes: [
              'derbyName',
              'number',
              'photo'            ]
          }]
        }).then(review=>{
          res(review.toJSON());
        })
      }
    }
  }
]
