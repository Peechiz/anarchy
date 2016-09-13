'use strict'

console.log('app.js loaded');
var app = angular.module('anarchy',['ngStorage','routes']);

app.factory('api', ['$http', ($http)=>{
  var api = {};

  api.getTeams = () => $http.get('/api/teams');
  api.getSkaters = () => $http.get('/api/skaters');
  api.getSkater = id => $http.get(`/api/skaters/${id}`)
  api.getRanks = () => $http.get('/api/ranks');
  api.getSkaterGear = id => $http.get(`/api/skaters/${id}/gear`);

  return api;
}])

app.factory('profile', ['$localStorage', 'api', ($localStorage, api)=>{
  return {
    getProfile: () => {
      const id = $localStorage.currentUser.id;
      return api.getSkater(id);
    }
  }
}])

app.factory('auth', ['$http', '$localStorage', ($http, $localStorage) => {
  var auth = {}

  auth.Login = login;
  auth.Logout = logout;

  return auth;

  function login(userName, password, callback){
    $http.post('/api/auth', {userName: userName, password: password})
      .success(response => {
        // login successful if there's a token in the response
       if (response.token) {
           // store username and token in local storage to keep user logged in between page refreshes
           $localStorage.currentUser = {
             userName: userName,
             id: response.id,
             admin: response.admin,
             token: response.token
           };

           // add jwt token to auth header for all requests made by the $http service
           $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

           // execute callback with true to indicate successful login
           callback(true);
       } else {
           // execute callback with false to indicate failed login
           callback(false);
       }
      })
  }

  function logout(){
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
    // post to api/logout, remove admin thing marker
  }
}])
