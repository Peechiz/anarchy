'use strict'

app.controller('profileController', ['profile', 'gear', 'brands','api', 'mayEdit', '$route', '$localStorage', '$window', profileController])

function profileController(profile, gear, brands, api, mayEdit, $route, $localStorage, $window){
  const p = this;
  console.log('profile controller up');

  var id;
  if (Object.keys($route.current.params).length){
    id = $route.current.params.id
  } else {
    id = $localStorage.currentUser.id
  }
  console.log('id:',id);

  p.mayEdit = mayEdit;
  p.profile = profile.data;
  p.gear = gear.data;
  p.brands = brands.data;
  p.sort = true;
  p.categories = {
    Boot :'Boot',
    Toestop :'Toestop',
    Wheels :'Wheels',
    Plates :'Plates',
    Helmet :'Helmet',
    Elbowpads :'Elbowpads',
    Wristgaurds :'Wristgaurds',
    Mouthgaurd :'Mouthgaurd',
    Other :'Other'
  }

  p.showRev = {};
  p.editGear = {};
  p.info = {
    derbyName: p.profile.derbyName,
    number: p.profile.number,
    favPosition: p.profile.favPosition,
    photo: p.profile.photo
  };
  p.addGear = {
    show: false,
  };
  p.editGear = {

  };
  p.showNewBrand = false;
  p.showEditInfo = false;
  p.showEditBio = false;
  // p.showReview = function(id){
  //   p.g[id] = !p.g[id]
  // }
  p.selection = {
    gear: true,
    old: false
  };
  p.select = function(key){
    if (key === 'gear'){
      p.selection.gear = true;
      p.selection.old = false;
    } else {
      p.selection.old = true;
      p.selection.gear = false;
    }
  }

  p.test = (thing, other)=>{
    console.log(thing, other);
  }

  p.checkNew = () => {
    if (p.addGear.brand === "new"){
      p.showNewBrand = true;
    }
    else {
      p.showNewBrand = false;
    }
  }

  p.sgEdit = (data, gearId, sgId) => {
    console.log('submitting edit!');
    data.brand = data.brand.id;
    data.sgId = sgId;
    data.rating = Number(data.rating) || null
    console.log(data);
    api.updateSkaterGear(id,data,gearId).then(result=>{
      console.log(result);
      $window.location.reload();
    })
  }
  p.sgNew = () => {
    console.log('submitting new gear!');
    skaterGear('addGear', 'addSkaterGear')
  }

  p.sgDelete = gearId => {
    api.deleteSkaterGear(id,gearId).then(result=>{
      console.log(result);
      $window.location.reload();
    })
  }

  function skaterGear(location, httpMethod, gearId){
    var data = {
      name: p[location].name,
      type: p[location].type,
      newBrand: p.newBrand ? true : false,
      brand: p.newBrand || p[location].brand, // str || id
      img:  p[location].img,
      isCurrent: p[location].isCurrent,
      rating: p[location].rating,
      review: p[location].review
    }
    api[httpMethod](id,data, gearId || null).then(result=>{
      console.log(result);
      $window.location.reload();
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
      Object.keys(p.info).forEach(key=>{
        p.profile[key] = p.info[key]
      })
      p.showEditInfo = false;
      return;
    })
  }

}
