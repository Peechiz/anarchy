'use strict'

app.controller('profileController', ['profile', profileController])

function profileController(profile){
  console.log('profile controller up');

  const p = this;

  p.profile = profile.data;
  console.log(p.profile);
}
