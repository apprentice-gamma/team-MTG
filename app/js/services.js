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

services.factory('Forecast', ['$q', '$http', 'key', function($q, $http, key) {
  return {
    get: function(lat, lng) {
      var deferred = $q.defer();
      var rootUrl = 'https://api.forecast.io/forecast/';
      $http.jsonp(rootUrl + key + '/' + lat + ',' + lng + '?callback=JSON_CALLBACK')
        .success(function(weatherData) {
          return deferred.resolve(weatherData);
        });
        return deferred.promise;
    }
  };
}]);

services.factory('Geolocation', ['$q', function($q) {
  return {
    get: function() {
      var deferred = $q.defer();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var coordinates = {
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude)
          }
          return deferred.resolve(coordinates);
        });
      }
      return deferred.promise;
    } 
  };
}]);