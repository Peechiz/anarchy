'use strict'

app.controller('landingController', landingController)

function landingController($http){
  console.log('controller up');
  const l = this;

  l.blam = ()=>{
    console.log('BLAM!');
    console.log(l.pass,l.user);
    $http({
      method: 'POST',
      url: '/api/auth',
      data: {
        user: l.user,
        pass: l.pass
      }
    }).then(res=>{
      console.log(res);
    })
  }
}
