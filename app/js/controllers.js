angular.module('app').controller("FormController", ["GoogleGeo", "Forecast", function(GoogleGeo, Forecast) {
  var vm = this;

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