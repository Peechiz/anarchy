'use strict'

console.log('app.js loaded');
var app = angular.module('anarchy',['routes']);

app.factory('api', ['$http', ($http)=>{
  var api = {};
  var teams = '/api/teams'

  api.getTeams = function(){
    return $http.get(teams)
  }

  return api;
}])
