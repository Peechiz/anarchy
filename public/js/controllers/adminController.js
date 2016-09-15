'use strict'

app.controller('adminController', ['$scope', 'api', 'isAdmin', 'ranks', 'teams', '$window', adminController])

function adminController($scope, api, isAdmin, ranks, teams, $window){
  const a = this;

  a.isAdmin = isAdmin;
  a.ranks = ranks.data.map(rank => {
    return {id: rank.id, name: rank.name}
  })
  // console.log(teams);
  a.teams = teams.data.map(team=>{
    return {id: team.id, name: team.teamName}
  })

  a.data = {};
  a.data.skaters = {};
  // console.log(a.ranks);


  if (a.isAdmin){
    api.getSkaters().then(res=>{
      a.skaters = res.data;
      // console.log(a.skaters);
      a.skaters.forEach(skater => {
        a.data.skaters[skater.id] = {};

        a.data.skaters[skater.id].rank = {id: skater.rankId, name: skater.rank.name}
        a.data.skaters[skater.id].team = {id: skater.teamId, name: skater.team.teamName}
      })
    })

    api.getTeams().then(res=>{
      a.teams = res.data;
      // console.log(a.teams);
    })
  }

  a.editSkater = (id) => {
    console.log('skaters:',a.skaters);
    var data = {
      rank: a.data.skaters[id].rank.id,
      team: a.data.skaters[id].team.id
    }
    api.updateSkater(id,data).then( res =>{
      $window.location.reload();
    })
  }
}
