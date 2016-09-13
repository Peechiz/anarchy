'use strict'

app.controller('adminController', ['api', adminController])

function adminController(api){
  const a = this;

  a.teams = [{teamName: 'Legion'}, {teamName: 'Owls'}, {teamName: 'Some Other Team'}]

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
