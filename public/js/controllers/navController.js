'use strict'

app.controller('navController', navController)

function navController(){
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
    for (var prop in n.nav){
      n.nav[prop] = false;
    }
    n.nav[key] = true;
  }
}
