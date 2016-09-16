'use strict'

app.filter('type', ()=>{
  return (input, type)=>{
    if (type === 'all') return input;
    var out = [];
    angular.forEach(input, (skater) => {
      if (type === 'pending' && skater.rankId == 1){
        out.push(skater);
      } else if (type === 'current' && skater.rankId != 1){
        out.push(skater)
      }
    })
    return out;
  }
})

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
  a.new = {};
  a.sort = {
    options: [
      {name: 'number', value: 'a.sort.number'},
      {name: 'name', value: 'a.sort.name'},
      {name: 'rank', value: 'a.sort.rank'},
    ],
  };
  a.show = {
    table: true
  };

  a.select = function(key){
    if (key === 'add') {
      a.show.addSkater = true;
      a.show.table = false;
    }
    else {
      a.show.addSkater = false;
      a.show.table = true;
    }
  }

  if (a.isAdmin){
    api.getSkaters().then(res=>{
      a.skaters = res.data;
      // console.log(a.skaters);
      a.skaters.forEach(skater => {
        a.data.skaters[skater.id] = {};

        a.data.skaters[skater.id].rank = {id: skater.rankId, name: skater.rank.name}
        if (skater.team){
          a.data.skaters[skater.id].team = {id: skater.teamId, name: skater.team.teamName}
        }
      })
    })

    api.getTeams().then(res=>{
      a.teams = res.data;
      // console.log(a.teams);
    })
  }

  a.deletePrompt = skater => {
    a.show.warning = true;
    a.show.table = false;
    a.kill = skater;
  }
  a.whoops = () => {
    a.show.warning = false;
    a.show.table = true;
    a.kill = '';
  }
  a.delete = skater => {
    api.deleteSkater(skater.id).then(result => {
      $window.location.reload();
    })
  }

  a.newSkater = () => {
    if (a.new.password !== a.new.passwordConfirm){
      a.passMissMatch = true;
      return;
    }
    var data  = {
      userName: a.new.userName,
      password: a.new.password
    }
    api.newSkater(data).then(res => {
      console.log('you did it hurray', res);
      $window.location.reload();
    })
  }

  a.editSkater = id => {
    console.log('skaters:',a.skaters);
    var data = {
      admin: a.data.skaters[id].admin,
      rank: a.data.skaters[id].rank.id,
      team: a.data.skaters[id].team.id
    }
    api.updateSkater(id,data).then( res =>{
      $window.location.reload();
    })
  }
}
