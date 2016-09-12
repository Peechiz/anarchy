const Boom = require('boom');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

module.exports = [
  {
    method: 'POST',
    path: '/api/auth',
    config: {
      auth: false,
      handler: function(req,res){
        const Skaters = req.server.app.models.Skaters;
        Skaters.findAll({
          where: {userName: req.payload.userName}
        }).then(data => {
          console.log('DATA:',data);
          if (data.length){
            // found the skater
            var skater = data[0].toJSON();
            var validPass = bcrypt.compareSync(req.payload.password, skater.password)
            if (validPass){
              // return JWT
              var obj = {
                id: skater.id,
                userName: skater.userName,
                admin: skater.admin
              }

              var token = JWT.sign(obj, process.env.JWTKEY);
              res({token: token, admin: skater.admin})
            }
            else {
              res(Boom.badRequest('invalid password'))
            }

          }
          else {
            // couldn't find the skater
            res(Boom.notFound('skater not found'))
          }
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth/new',
    config: {
      handler: function(req,res){
        res('thanks for signing up!')
      }
    }
  }
]
