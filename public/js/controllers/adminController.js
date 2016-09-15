'use strict'

app.controller('adminController', ['$scope', 'api', 'isAdmin', adminController])

function adminController($scope, api, isAdmin){
  const a = this;

  a.isAdmin = isAdmin;

  if (a.isAdmin){
    api.getSkaters().then(res=>{
      a.skaters = res.data;
      console.log(res.data);
    })

    api.getRanks().then(res=>{
      a.ranks = res.data;
    })

    api.getTeams().then(res=>{
      a.teams = res.data;
      console.log(a.teams);
    })
  }
}
