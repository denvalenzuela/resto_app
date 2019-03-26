/*!
 * frontend -  v1.0.0 ()
 * Copyright 2017-2019 Den Russel Valenzuela
 */
(function(angular){
  'use strict';
  angular.module('myApp', ['ngRoute']);
})(angular);;(function(angular){
  'use strict';
    config.$inject = ["$routeProvider", "$locationProvider"];
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
})(angular);;(function(angular){
  'use strict';
  AnalyticsCtrl.$inject = ["$scope"];
  angular
    .module('myApp')
    .controller('AnalyticsCtrl', AnalyticsCtrl);

  function AnalyticsCtrl($scope){
    var vm = this;
  }

})(angular);;(function(angular){
  'use strict';
  MapCtrl.$inject = ["$scope", "MapSrvc"];
  angular
    .module('myApp')
    .controller('MapCtrl', MapCtrl);

  function MapCtrl($scope, MapSrvc){
    var vm = this;
    vm.postCount = postCount;

    vm.restaurantDetail = MapSrvc.get();
    function initMap(){
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(10.3157, 123.8854),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      angular.forEach(vm.restaurantDetail, function(value){

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(value.lat, value.long),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(value.name);
            infowindow.open(map, marker);
          }
        })(marker, i));
      });
    }

    initMap();

    function postCount(data){
      data.click_count++;
    }
  }

})(angular);;(function(angular){
  'use strict';
  RestaurantCtrl.$inject = ["$scope"];
  angular
    .module('myApp')
    .controller('RestaurantCtrl', RestaurantCtrl);

  function RestaurantCtrl($scope){
    var vm = this;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(10.3157, 123.8854),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

})(angular);;(function(angular){
  'use strict';
  MapSrvc.$inject = ["$http"];
  angular
    .module('myApp')
      .factory('MapSrvc', MapSrvc);

  function MapSrvc($http) {
    return{
      get: get,
      save: save,
      getDash: getMap
    };

    function get() {
      var jsonData = [{
        name: 'Anzani',
        lat: 10.3356,
        long: 123.8968,
        click_count: 14,
        cuisine: 'New Mediterranean',
        img: 'assets/img/anzani.jpg'
      },{
        name: 'Circa 1900',
        lat: 10.3268,
        long: 123.8999,
        click_count: 10,
        cuisine: 'Traditional Cebuano Influences',
        img: 'assets/img/circa.jpg'
      },{
        name: 'Blu Bar & Grill',
        lat: 10.3418,
        long: 123.8971,
        click_count: 20,
        cuisine: 'Grilled Food',
        img: 'assets/img/bluegrill.jpeg'
      },{
        name: 'Tavolata',
        lat: 10.3416,
        long: 123.9196,
        click_count: 17,
        cuisine: 'Italian',
        img: 'assets/img/tavolata.jpg'
      },{
        name: 'Casa Verde',
        lat: 10.3072,
        long: 123.8956,
        click_count: 25,
        cuisine: 'Filipino',
        img: 'assets/img/casa_verde.jpeg'
      }]
      // return $http.get('/api/map');
      return jsonData;
    }

    function save(data) {
      return $http.post('/api/map', data);
    }

    function getMap(data) {
      return $http.get('/api/map', {params: data});
    }
  }
})(angular);