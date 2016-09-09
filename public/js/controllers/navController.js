'use strict'

app.controller('navController', ['$scope','$location' ,navController])

function navController($scope, $location){
  const n = this;

  n.nav = {
    profile: false,
    teams: false,
    join: false,
    who: false,
    admin: false,
  }

  // sets the currently clicked link's color to white
  n.setClicked = function(key){
    n.clear();
    n.nav[key] = true;
  }

  n.clear = ()=>{
    for (var prop in n.nav){
      n.nav[prop] = false;
    }
  }

  n.redirect = function(){
    if ($location.path() !== '/'){
      n.clear();
      $location.path('/')
    }
  }
}
