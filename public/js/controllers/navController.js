'use strict'

app.controller('navController', ['$scope','$location', 'auth', navController])

function navController($scope, $location, auth){
  const n = this;

  n.hasLogin = false;
  n.form = false;

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

  n.auth = auth;

  n.cb = function(result){
    if (result){
      console.log('logged in');
    }
    else {
      console.log('there was a problem logging in.');
    }
  }
}
