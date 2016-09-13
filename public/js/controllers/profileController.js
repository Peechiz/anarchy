'use strict'

app.controller('profileController', ['profile', 'gear', profileController])

function profileController(profile, gear){
  console.log('profile controller up');

  const p = this;
  p.showRev = {};
  p.showEditGear = {};
  p.showEditInfo = false;
  p.showEditBio = false;

  // p.showReview = function(id){
  //   p.g[id] = !p.g[id]
  // }

  p.sgEditSubmit = id => {
    console.log('submitting edit!',id);
  }

  p.bioSubmit = () => {
    console.log('submitting bio');
  }

  p.infoSubmit = () => {
    console.log('submitting info');
  }

  p.profile = profile.data;
  p.gear = gear.data;
  console.log(profile.data);
  console.log(gear.data);
}
