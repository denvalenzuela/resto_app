(function(angular){
  'use strict';
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

})(angular);