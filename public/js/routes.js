console.log('routes loaded');

angular.module('routes',['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController',
    controllerAs: 'profile'
  })
  .when('/',{
    templateUrl: 'views/landing.html',
    controller: 'landingController as l'
  })
  .when('/join',{
    templateUrl: 'views/join.html',
    controller: 'joinController as j'
  })
  .when('/whoarewe',{
    templateUrl: 'views/whoarewe.html',
    // controller: 'joinController as j'
  })
  .when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'adminController as a'
  })
  .when('/teams', {
    templateUrl: 'views/teams.html',
    controller: 'teamsController as t'
  })
});
