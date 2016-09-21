'use strict'

app.controller('joinController', ['api', joinController])

function joinController(api){
  const j = this;

  j.show = 'intro'; // intro, questions, thanks
  j.passMatch = false;

  j.submit = function() {

    if (j.password !== j.passwordConfirm){
      j.passMatch = true;
      return
    }

    var data = {
      xp: j.xp,
      userName: j.userName,
      password: j.password,
      tel: j.tel,
      email: j.email,
      hasSkates: j.hasSkates,
      hasPads: j.hasPads,
    }
    api.submitApplication(data).then(result => {
      // show thank you message
      console.log(result);
      j.show = 'thanks';
    }, error => {
      console.log('oops');
    })
  }
}
