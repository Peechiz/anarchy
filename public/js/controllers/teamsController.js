'use strict'

app.controller('teamsController', ['$scope', 'api', teamsController])

function teamsController($scope, api){
  const t = this;

  t.teams;
  t.selected;

  api.getTeams().then(res=>{
    t.teams = res.data;
  })
}
