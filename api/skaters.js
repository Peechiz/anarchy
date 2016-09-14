const Boom = require('boom');

module.exports = [{
  method: 'GET',
  path: '/api/skaters',
  config: {
    // auth: 'admin',
    handler: (req,res) => {
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
    handler: (req,res) =>  {
      const m = req.server.app.models;
      m.SkatersGears.findAll({
        where: {skaterId: req.params.id},
        attributes: ['isCurrent','id','img'],
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
  method: 'PUT',
  path: '/api/skaters/{id}/info',
  config: {
    handler: (req,res) => {
      const m = req.server.app.models
      console.log('PAYLOAD:', req.payload);
      m.Skaters.upsert({
        id: req.params.id,
        derbyName: req.payload.derbyName,
        number: req.payload.number,
        favPosition: req.payload.favPosition,
        photo: req.payload.photo
      }).then(result=>{
        res(result)
      })
    }
  }
},{
  method: 'PUT',
  path: '/api/skaters/{id}/bio',
  config: {
    handler: (req,res) => {
      const m = req.server.app.models
      m.Skaters.upsert({
        id: req.params.id,
        summary: req.payload.summary
      }).then(result=>{
        res(result)
      })
    }
  }
},{
  method: 'POST',
  path: '/api/skaters/{id}/gear',
  config: {
    handler: (req,res) => {
      const m = req.server.app.models;
      m.SkatersGears.create({
        skaterId: req.params.id,
        gearId: req.payload.gearId,
        img: req.payload.img,
        isCurrent: req.payload.isCurrent
      }).then(result=>{
        res(result.toJSON())
      })
    }
  }
},{
  method: 'GET',
  path: '/api/skaters/{id}',
  config: {
    handler: (req,res) => {
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
