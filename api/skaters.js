const Boom = require('boom');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


var rand = () => {
  var num = Math.floor(Math.random() * 1000)
  num = num.toString();
  if (num.length < 4){
    var diff = 4 - num.length;
    num = num.split('')
    for (var i = 0; i < diff; i++){
      num.unshift('0')
    }
    return num.join('')
  }
  return num;
}

module.exports = [{
  method: 'GET',
  path: '/api/skaters',
  config: {
    // auth: 'admin',
    handler: (req,res) => {
      const m = req.server.app.models;
      const token = req.headers.authorization.split(' ')[1]
      var exclude = ['password', 'tel', 'email']
      if (token){
        const decoded = JWT.verify(token, process.env.JWTKEY);
        // if request from Admin, include contact info
        if (!decoded.isAdmin){
          exclude = ['password'];
        }
      }

      m.Skaters.findAll({
        attributes: { exclude: exclude },
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
  method: 'POST',
  path: '/api/skaters',
  config: {
    handler: (req,res) => {
      const m = req.server.app.models;
      m.Skaters.create({
        userName: req.payload.userName,
        derbyName: `maggot${rand()}`,
        password: bcrypt.hashSync(req.payload.password, 8),
        tel: req.payload.tel,
        email: req.payload.email
      }).then(result => {
        res(result)
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
          attributes: ['name', 'type', 'id'],
          include: [{
            model: m.Brands,
            attributes: ['name','id']
          },{
            model: m.Reviews,
            attributes: ['rating', 'text', 'id']
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
    auth: 'author',
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
    auth: 'author',
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
  method: 'PUT',
  path: '/api/skaters/{id}',
  config: {
    auth: 'admin',
    handler: (req,res)=>{
      const m = req.server.app.models;
      m.Skaters.upsert({
        id: req.params.id,
        teamId: req.payload.team,
        rankId: req.payload.rank,
        admin: req.payload.admin
      }).then(result=>{
        res(result)
      })
    }
  }
},{
  method: 'POST',
  path: '/api/skaters/{id}/gear',
  config: {
    auth: 'author',
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
  method: 'PUT',
  path: '/api/skaters/{id}/gear/{gearId}',
  config: {
    auth: 'author',
    handler: (req,res) => {
      const m = req.server.app.models;
      const db = m.db;

      db.transaction( t => {
        return m.Gears.upsert({
          id: req.params.gearId,
          name: req.payload.name,
          type: req.payload.type,
          brandId: req.payload.brand
        },{transaction: t})
        .then(gear => {
          return m.SkatersGears.upsert({
            id: req.payload.sgId,
            gearId: gear.id,
            skaterId: req.params.id,
            img: req.payload.img,
            isCurrent: req.payload.isCurrent
          },{transaction: t})
        }).then(sg => {
          return m.Reviews.upsert({
            id: req.payload.reviewId,
            gearId: req.params.gearId,
            skaterId: req.params.id,
            text: req.payload.review,
            rating: req.payload.rating
          },{transaction: t})
        })
      }).then(result => {
        res('you did it hurray')
      }).catch(err => {
        console.log(err);
        res(err)
      })
    }
  }
},{
  method: 'DELETE',
  path: '/api/skaters/{id}',
  config: {
    auth: 'admin',
    handler: (req,res) => {
      const m = req.server.app.models;

      m.Skaters.destroy({
        where: {id: req.params.id}
      }).then(numKilled => {
        res('deleted ' + numKilled )
      })
    }
  }
},{
  method: 'DELETE',
  path: '/api/skaters/{id}/gear/{gearId}',
  config: {
    auth: 'author',
    handler: (req,res) => {
      const m = req.server.app.models;

      m.SkatersGears.destroy({
        where: {
          skaterId: req.params.id,
          gearId: req.params.gearId
        }
      }).then(numKilled => {
        res('deleted ' + numKilled)
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
