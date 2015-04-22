var services = angular.module('services', []);

services.factory('GoogleGeo', ['$q', function($q) {
  return {
    get: function(address) {
      var geocoder = new google.maps.Geocoder();
      var deferred = $q.defer();
      geocoder.geocode( {address: address }, function(results, status) {
          var latLng = results[0].geometry.location;
          var coordinates = {
            lat: String(latLng.k), 
            lng: String(latLng.D)
          };
          return deferred.resolve(coordinates);
      });
      return deferred.promise;
    }
  };
}]);