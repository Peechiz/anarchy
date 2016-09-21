'use strict'

app.controller('teamsController', ['$scope', '$window', 'teams', teamsController])

function teamsController($scope, $window, teams){
  console.log('teams controller up!');
  const t = this;

  t.teams = teams.data;
  t.select = {};

  t.view = function(id) {
    $window.location.href = `/#/skaters/${id}`;
    $window.location.reload();
  }
}
