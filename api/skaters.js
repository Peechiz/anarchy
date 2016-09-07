module.exports = [
  {
    method: 'GET',
    path: '/api/skaters',
    config: {
      handler: function(req,res){
        res('hello skaters')
      }
    }
  }
]
