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
    show: false
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

  p.sgEdit = id => {
    console.log('submitting edit!',id);
  }

  p.sgNew = id => {
    console.log('submitting new gear!');
    // if new brand, submit new brand
    var brandId;
    if (p.addGear.brand === 'new'){
      api.addBrand({
        name: p.newBrand
      }).then(result => {
        brandId = result.toJSON().id;
        return submitGear(brandId);
      }).then( newGear => {
        return submitSG(newGear.id)
      }).then( result => {
        console.log('added new brand and everything');
      })
    }
    else {
      submitGear(p.addGear.brand)
      .then(newGear => {
        return submitSG(newGear.id)
      }).then( result => {
        console.log('added new skater gear with existing brand');
      })
    }
    // then submit name, type, brandId to Gears
    function submitGear(brandId){
      return api.addGear({
        name: p.addGear.name,
        type: p.addGear.type,
        brandId: brandId
      })
    }
    // then submit userId, gearId to SkaterGears
    function submitSG(gearId){
      return api.addSkaterGear(id,{
        gearId: gearId,
        img: p.addGear.img,
        isCurrent: p.addGear.isCurrent
      })
    }
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
