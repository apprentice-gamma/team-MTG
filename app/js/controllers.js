angular.module('app').controller("FormController", ["GoogleGeo", function(GoogleGeo) {
  var vm = this;

  vm.getCoordinates = function(address) {
    GoogleGeo.get(address).then(function(coordinates) {
      console.log(coordinates.lat);
      console.log(coordinates.lng);
   });
  }
}]);