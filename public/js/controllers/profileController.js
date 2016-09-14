'use strict'

app.controller('profileController', ['profile', 'gear', 'brands','api', '$localStorage', '$window', profileController])

function profileController(profile, gear, brands, api, $localStorage, $window){
  const p = this;
  console.log('profile controller up');

  const id = $localStorage.currentUser.id;
  p.profile = profile.data;
  p.gear = gear.data;
  p.brands = brands.data;

  p.showRev = {};
  p.showEditGear = {};
  p.info = {
    derbyName: p.profile.derbyName,
    number: p.profile.number,
    favPosition: p.profile.favPosition,
    photo: p.profile.photo
  };
  p.addGear = {
    show: false,
  };
  p.showNewBrand = false;
  p.showEditInfo = false;
  p.showEditBio = false;
  // p.showReview = function(id){
  //   p.g[id] = !p.g[id]
  // }

  p.checkNew = () => {
    if (p.addGear.brand === "new"){
      p.showNewBrand = true;
    }
    else {
      p.showNewBrand = false;
    }
  }

  p.sgEdit = () => {
    console.log('submitting edit!');
  }

  p.sgNew = () => {
    console.log('submitting new gear!');
    // if new brand, submit new brand
    var brandId;
    var data = {
      name: p.addGear.name,
      type: p.addGear.type,
      newBrand: p.newBrand ? true : false,
      brand: p.newBrand || p.addGear.brand, // str || id
      img:  p.addGear.img,
      isCurrent: p.addGear.isCurrent,
      rating: p.addGear.rating,
      review: p.addGear.review
    }
    api.addSkaterGear(id,data).then(result=>{
      console.log(result);
    })
  }

  p.bioSubmit = () => {
    api.updateSkaterBio(id,{summary: p.profile.summary}).then(result => {
      p.showEditBio = false;
      return;
    })
  }

  p.infoSubmit = () => {
    api.updateSkaterInfo(id, p.info).then(result =>{
      // close the edit thing
      Object.keys(p.info).forEach(key=>{
        p.profile[key] = p.info[key]
      })
      p.showEditInfo = false;
      return;
    })
  }

}
