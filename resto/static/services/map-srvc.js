(function(angular){
  'use strict';
  angular
    .module('myApp')
      .factory('MapSrvc', MapSrvc);

  function MapSrvc($http) {
    return{
      getPlace: getPlace,
      getNearby: getNearby,
      getPopulartimes: getPopulartimes
    };

    function getPlace(data) {
      return $http.get('/api/place', {params: data});
    }

    function getNearby(data) {
      return $http.get('/api/nearby', {params: data});
    }

    function getPopulartimes(data) {
      return $http.get('/api/populartimes', {params: data});
    }
  }
})(angular);