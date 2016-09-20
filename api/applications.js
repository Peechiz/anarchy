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
