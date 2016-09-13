'use strict'

app.controller('navController', ['$scope','$location', '$window', 'auth', '$localStorage', navController])

function navController($scope, $location, $window, auth, $localStorage){
  const n = this;

  n.hasLogin = $localStorage.currentUser ? true : false;
  n.form = false;

  n.nav = {
    profile: false,
    teams: false,
    join: false,
    who: false,
    admin: false,
  }

  n.isAdmin = (function(){
    if (n.hasLogin){
      return $localStorage.currentUser.admin
    }
    return false
  })()

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

  n.reload = ()=> {
    n.clear();
    $window.location.href = '/#/'
    $window.location.reload();
  }

  n.auth = auth;

  n.cb = function(result){
    if (result){
      console.log('logged in');
      n.form = false;
      n.hasLogin = true;
      $window.location.href = $location.path;
      $window.location.reload();

    }
    else {
      console.log('there was a problem logging in.');
    }
  }

  n.login = (user,pass,cb) => {
    n.auth.Login(user,pass,n.cb)
  }

  n.logout = function(){
    console.log('logging out');
    n.auth.Logout()
    n.hasLogin = false;
    n.isAdmin = false;
    n.user = '';
    n.pass = '';
    $window.location.href = '/#/'
    $window.location.reload();
  }


}
