'use strict'

console.log('app.js loaded');
var app = angular.module('anarchy', ['ngStorage', 'routes']);

app.factory('api', ['$http', ($http) => {
  var api = {};

  api.getTeams = () => $http.get('/api/teams');
  api.getSkaters = () => $http.get('/api/skaters');
  api.getSkater = id => $http.get(`/api/skaters/${id}`);
  api.getBrands = () => $http.get('/api/brands');
  api.getRanks = () => $http.get('/api/ranks');
  api.getSkaterGear = id => $http.get(`/api/skaters/${id}/gear`);

  api.addBrand = data => {
    return $http.post('/api/brands', data)
  };
  api.addGear = data => {
    return $http.post('/api/gear', data)
  };
  api.updateSkaterGear = (id, data, gearId) => {
    return $http.put(`/api/skaters/${id}/gear/${gearId}`, data)
  }
  api.addSkaterGear = (id, data) => {
    return $http.post(`/api/skaters/${id}/gear`, data)
  };
  api.deleteSkaterGear = (id,gearId) => {
    return $http.delete(`/api/skaters/${id}/gear/${gearId}`)
  }
  api.updateSkaterInfo = (id, data) => {
    return $http.put(`/api/skaters/${id}/info`, data)
  };
  api.updateSkaterBio = (id, data) => {
    return $http.put(`/api/skaters/${id}/bio`, data)
  };

  return api;
}])

app.factory('profile', ['$localStorage', 'api', ($localStorage, api) => {
  const id = $localStorage.currentUser.id;
  return {
    getProfile: () => {
      return api.getSkater(id);
    },
    getGear: () => {
      return api.getSkaterGear(id);
    }
  }
}])

app.factory('edit', ['$localStorage', '$route', ($localStorage, $route)=>{

  return {
    mayEdit: () => {
      var id = $localStorage.currentUser.id;
      var admin = $localStorage.currentUser.admin;
      var pathId = $route.current.params.id;
      var authorized = id == pathId || admin;

      return authorized;
    }
  }
}])

app.factory('auth', ['$http', '$localStorage' , ($http, $localStorage) => {
  var auth = {}

  auth.Login = login;
  auth.Logout = logout;
  auth.isAdmin = isAdmin;

  return auth;

  function isAdmin(){
    var admin;
    try {
      return $localStorage.currentUser.admin;
    } catch (err) {
      return false;
    }

  }

  function login(userName, password, callback) {
    $http.post('/api/auth', {
        userName: userName,
        password: password
      })
      .then(success => {
        // login successful if there's a token in the response
        console.log('success', success);
        success = success.data;
        if (success.token) {
          // store username and token in local storage to keep user logged in between page refreshes
          $localStorage.currentUser = {
            userName: userName,
            id: success.id,
            admin: success.admin,
            token: success.token
          };

          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.common.Authorization = 'Bearer ' + success.token;

          // execute callback with true to indicate successful login
          return callback(true);
        } else {
          // execute callback with false to indicate failed login
          return callback(false);
        }
      }, fail => {
        return callback(fail)
      })
  }

  function logout() {
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
    // post to api/logout, remove admin thing marker
  }
}])
