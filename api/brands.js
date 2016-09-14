module.exports = [
  {
    method: 'GET',
    path: '/api/brands',
    config: {
      handler: (req,res) => {
        const m = req.server.app.models;
        m.Brands.findAll().then(brands => {
          res(brands.map(x=>x.toJSON()))
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/brands',
    config: {
      handler: (req,res) => {
        const m = req.server.app.models;
        m.Brands.create({
          name: req.payload.name
        }).then(result => {
          res(result.toJSON())
        })
      }
    }
  }
]
