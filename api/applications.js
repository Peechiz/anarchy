var rand = () => {
  var num = Math.floor(Math.random() * 9999)
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
  method: 'POST',
  path: '/api/applications',
  config: {
    handler: (req, res) => {
      const m = req.server.app.models;
      const db = m.db;

      db.transaction(t => {
        return m.Skaters.create({
          userName: req.payload.userName,
          password: req.payload.password,
          email: req.payload.email,
          tel: req.payload.tel,
          derbyName: `maggot${rand()}`,
        },{transaction: t}).then(skater => {
          return m.Applications.create({
            skaterId: skater.id,
            xp: req.payload.xp,
            hasSkates: req.payload.hasSkates,
            hasPads: req.payload.hasPads
          },{transaction: t})
        })
      }).then(result => {
        console.log('RESULT!');
        res('congrats you did it');
      }).catch(err => {
        console.log(err);
        res('something went horribly wrong');
      })
    }
  }
}]
