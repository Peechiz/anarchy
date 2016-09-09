const Boom = require('boom');

module.exports = [
  {
    method: 'POST',
    path: '/api/auth',
    config: {
      handler: function(req,res){
        console.log(req.payload);
        res(req.payload)
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth/new',
    config: {
      handler: function(req,res){
        res('profile created')
      }
    }
  }
]
