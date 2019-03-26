(function(angular){
  'use strict';
  angular
    .module('myApp')
    .config(config);

    function config($routeProvider, $locationProvider){
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $routeProvider
      .when("/", {
          templateUrl : "../pages/map/map-tpl.html",
          controller: 'MapCtrl',
          controllerAs: 'map'
      })
      .when("/map", {
          templateUrl : "../pages/map/map-tpl.html",
          controller: 'MapCtrl',
          controllerAs: 'map'
      })
      .when("/restaurant", {
          templateUrl : "../pages/restaurant/restaurant-tpl.html",
          controller: 'RestaurantCtrl',
          controllerAs: 'restaurant'
      })
      .when("/analytics", {
          templateUrl : "../pages/analytics/analytics-tpl.html",
          controller: 'AnalyticsCtrl',
          controllerAs: 'analytics'
      });
    }
})(angular);