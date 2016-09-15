console.log('routes loaded');

angular.module('routes',['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'profileController as p',
    resolve: {
      profile: (profile) => {
        return profile.getProfile()
      },
      gear: (profile) => {
        return profile.getGear()
      },
      brands: (api) => {
        return api.getBrands();
      },
      mayEdit: () => {
        return true
      }
    }
  })
  .when('/skaters/:id', {
    templateUrl: 'views/profile.html',
    controller: 'profileController as p',
    resolve: {
      profile: ($route, api) => {
        return api.getSkater($route.current.params.id)
      },
      gear: ($route, api) => {
        return api.getSkaterGear($route.current.params.id)
      },
      brands: (api) => {
        return api.getBrands();
      },
      mayEdit: (edit) => {
        return edit.mayEdit();
      }

    }
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
    controller: 'adminController as a',
    resolve: {
      isAdmin: auth => {
        return auth.isAdmin();
      }
    }
  })
  .when('/teams', {
    templateUrl: 'views/teams.html',
    controller: 'teamsController as t',
    resolve: {
      teams: (api) => {
        return api.getTeams();
      }
    }
  })
});
