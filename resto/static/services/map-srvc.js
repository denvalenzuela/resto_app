(function(angular){
  'use strict';
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