(function(angular){
  'use strict';
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

})(angular);