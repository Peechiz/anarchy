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
    // controller: 'landingController'
  })
});
