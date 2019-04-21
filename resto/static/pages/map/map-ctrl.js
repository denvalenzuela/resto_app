(function(angular){
  'use strict';
  angular
    .module('myApp')
    .controller('MapCtrl', MapCtrl);

  function MapCtrl($scope, MapSrvc){
    var vm = this;
    vm.restoInfo = {};
    vm.pageToken = {
      prevpage: "",
      nextpage: "",
      pageCount: 0
    };
    vm.markers = [];

    vm.postCount = postCount;
    vm.placeInfo = placeInfo;
    vm.calcRoute = calcRoute;
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    vm.changeType = changeType;

    vm.cebuResto = {
      coordinates: {
        lat: 10.3157,
        lng: 123.8854
      },
      radius: 5000,
      type: "restaurant"
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: vm.cebuResto.coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: vm.cebuResto.coordinates,
      radius: vm.cebuResto.radius + 1000
    });

    var config = {
      type: 'bar',
      data: {
        datasets: []
      },
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      options: {
        responsive: true
      }
    };
    var ctx = document.getElementById('chartPopularTimes').getContext('2d');
    var myChart = new Chart(ctx, config);

    function getMap(data){
      var inputData;
      if (angular.equals(data, {})){
        inputData = angular.copy(vm.cebuResto);
      }
      else{
        inputData = {pagetoken: data};
      }
      MapSrvc.getNearby(inputData).then(function(response){
        var marker, i;
        vm.pageToken.nextpage = response.data.next_page_token || ""
        deleteMarkers();
        angular.forEach(response.data.results, function(value){

          marker = new google.maps.Marker({
            position: value.geometry.location,
            map: map
          });

          bounds.extend(marker.position);

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(value.name);
              infowindow.open(map, marker);
            }
          })(marker, i));

          value.click_count = 0;
          value.marker = marker;
          value.key = response.data.key;
        });
        map.fitBounds(bounds);
        vm.restaurantDetail = response.data.results;
      });
    }

    getMap({});

    function deleteMarkers() {
      angular.forEach(vm.restaurantDetail,function(value){
        value.marker.setMap(null);
      });
      vm.restaurantDetail = [];
    }

    function changeType(){
      if (vm.cebuResto.keyword != "" && vm.cebuResto.keyword != undefined){
        vm.pageToken.pageCount = 0;
        getMap({});
      }
    }

    function prevPage(){
      vm.pageToken.pageCount--;
      var data = vm.pageToken.prevpage;
      if (data == ""){
        data = {};
      }
      getMap(data);
    }

    function nextPage(){
      vm.pageToken.pageCount++;
      var data = vm.pageToken.nextpage;
      if (vm.pageToken.pageCount > 1 && vm.pageToken.nextpage != ""){
        vm.pageToken.prevpage = vm.pageToken.nextpage;
      }else{
        vm.pageToken.prevpage = "";
      }
      if (data == ""){
        data = {};
      }
      getMap(data);
    }

    function postCount(data){
      data.click_count++;
      getLocation();
      vm.directionsDisplay = new google.maps.DirectionsRenderer();
      vm.map2 = new google.maps.Map(document.getElementById('map2'), {
        zoom: 16,
        center: data.geometry.location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      vm.infoWindow2 = new google.maps.InfoWindow;
      var marker = new google.maps.Marker({
        position: data.geometry.location,
        map: vm.map2
      });
      vm.infoWindow2.setContent(data.name);
      vm.infoWindow2.open(vm.map2, marker);
      vm.directionsDisplay.setMap(vm.map2);
      var inputData = {
        place_id: data.place_id
      }
      vm.restoInfo = {};
      MapSrvc.getPopulartimes(inputData).then(function(response){
        vm.restoInfo = angular.copy(data);
        vm.restoInfo.phone = response.data.international_phone_number || "";
        vm.restoInfo.populartimes = response.data.populartimes || [];
        config.data.datasets = [];
        config.labels = [];
        var color = Chart.helpers.color;
        angular.forEach(vm.restoInfo.populartimes, function(value){
          var sumData = 0;
          angular.forEach(value.data, function(num){
            sumData = sumData + num;
          });
          config.data.datasets.push({
            data: [sumData],
            backgroundColor: color('#008000').alpha(0.5).rgbString(),
            borderColor: '#008000',
            label: value.name
          });
          config.labels.push(value.name);
        });
        if (myChart) {
          myChart.update();
        }
        else{
          var ctx = document.getElementById('chartPopularTimes').getContext('2d');
          var myChart = new Chart(ctx, config);
        }
      });
    }

    function placeInfo(data){
      infowindow.setContent(data.name);
      infowindow.open(map, data.marker);
    }

    function calcRoute() {
      if (vm.currLocation && vm.restoInfo){
        var directionsService = new google.maps.DirectionsService();
        var request = {
          origin: vm.currLocation,
          destination: vm.restoInfo.geometry.location,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            vm.directionsDisplay.setDirections(result);
          }
        });
      }
    }

    function getLocation(map2, infoWindow2) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          vm.currLocation = pos;
        }, function() {
          handleLocationError(true, vm.infoWindow2, vm.map2.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, vm.infoWindow2, vm.map2.getCenter());
      }
    }

  }

})(angular);