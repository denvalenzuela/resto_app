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

    var chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    var gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    var ctx = document.getElementById('lineChartExample').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    var myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Active Users",
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }]
      },
      options: gradientChartOptionsConfiguration
    });


    var gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    var ctx = document.getElementById('lineChartExampleWithNumbersAndGrid').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#18ce0f');
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));

    var myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        datasets: [{
          label: "Email Stats",
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        }]
      },
      options: gradientChartOptionsConfigurationWithNumbersAndGrid
    });


    var e = document.getElementById("barChartSimpleGradientsNumbers").getContext("2d");

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

    var a = {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
          label: "Active Countries",
          backgroundColor: gradientFill,
          borderColor: "#2CA8FF",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#2CA8FF",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: 0,
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            }
          }],
          xAxes: [{
            display: 0,
            gridLines: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 15
          }
        }
      }
    };

    var viewsChart = new Chart(e, a);


  }

})(angular);;(function(angular){
  'use strict';
  MapCtrl.$inject = ["$scope", "MapSrvc"];
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