module.exports = [{
  method: 'POST',
  path: '/api/gear',
  config: {
    handler: (req,res) => {
      console.log('posting to gear');
      const m = req.server.app.models;

      m.Gears.create({
        name: req.payload.name,
        type: req.payload.type,
        brandId: req.payload.brandId
      }).then(result=>{
        res(result.toJSON())
      })
    }
  }
},{
  method: 'GET',
  path: '/api/gear',
  config: {
    handler: (req,res) => {
      const m = req.server.app.models;

      m.Gears.findAll().then(gear=>{
        res(gear.map(x=>x.toJSON()))
      })
    }
  }
}]
