angular.module('app').controller("FormController", ["GoogleGeo", "Forecast", "Geolocation", function(GoogleGeo, Forecast, Geolocation) {
  var vm = this;

  Geolocation.get().then(function(coordinates) {
    console.log(coordinates);
  });

  vm.getCoordinates = function(address) {
    GoogleGeo.get(address).then(function(coordinates) {
      console.log(coordinates.lat);
      console.log(coordinates.lng);
      Forecast.get(coordinates.lat, coordinates.lng)
        .then(function(weather) {
          console.log(weather.currently);
        })
   });
  }
}]);