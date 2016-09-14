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
      const db = m.db;
      console.log('DOING THE THING!');
      // BIG TRANSACTION
        // 1. if brand ~ String =>
      if (req.payload.newBrand){
        db.transaction(t => {
          // make new brand
          return m.Brands.create({
            name: req.payload.brand
          },{ transaction: t })
          .then(brand => {
            console.log('BRAND:',brand);
            // make new gear with newBrandId
            return m.Gears.create({
              name: req.payload.name,
              type: req.payload.type,
              brandId: brand.id
            },{ transaction: t })
          }).then(gear => {
            console.log('GEAR:', gear);

            // make new skaters_gears with gearID
            return db.transaction(t2 => {
              return m.SkatersGears.create({
                skaterId: req.params.id,
                gearId: gear.id,
                img: req.payload.img,
                isCurrent: req.payload.isCurrent
              }, {transaction: t}).then(sg=>{
                // insert the review
                return m.Reviews.create({
                  skaterId: req.params.id,
                  gearId: gear.id,
                  text: req.payload.review,
                  rating: req.payload.rating
                },{transaction: t})
              })
            })

          })
        }).then(result => {
          console.log('RESULT!');
          res('congrats you did it')
        }).catch(err => {
          console.log(err);
          res('something went horribly wrong')
        })

      } else {
        // 2. if brand ~ INTEGER
        db.transaction(function (t) {
          // find or create gear
          return m.Gears.findOrCreate({
            where: {
              brandId: req.payload.brand,
              name: req.payload.name,
              type: req.payload.type
            },
            transaction: t
          }).spread((gear,created)=>{
            // console.log(gear,created);
            // make new skaters_gears with gearID
            return db.transaction(t2 => {
              return m.SkatersGears.create({
                skaterId: req.params.id,
                gearId: gear.id,
                img: req.payload.img,
                isCurrent: req.payload.isCurrent
              }, {transaction: t}).then(sg=>{
                // insert the review
                return m.Reviews.create({
                  skaterId: req.params.id,
                  gearId: gear.id,
                  text: req.payload.review,
                  rating: req.payload.rating
                },{transaction: t})
              })
            })
          })
        }).then(function (result) {
          console.log('RESULT!');
          res('congrats you did it')
        }).catch(function (err) {
          console.log(err);
          res('something went horribly wrong')
        });

      }
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
