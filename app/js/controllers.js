(function() {

  var weatherControllers = angular.module('weatherControllers', []);

  weatherControllers.controller('FormController', ['GoogleGeo', 'Forecast', 'Geolocation', 'ReverseGeo', function(GoogleGeo, Forecast, Geolocation, ReverseGeo) {
    var vm = this;
    vm.addressInput;
    vm.visible = true;
    vm.temperature;
    vm.feelsLike;
    vm.humidity;
    vm.windSpeed;
    vm.icon;
    vm.summary;
    vm.precipitation;
    vm.city;

    vm.getCoordinates = function(address) {
      GoogleGeo.get(address).then(function(coordinates) {
        Forecast.get(coordinates.lat, coordinates.lng)
          .then(function(weather) {
            vm.temperature = weather.currently.temperature;
            vm.feelsLike = weather.currently.apparentTemperature;
            vm.humidity = weather.currently.humidity * 100;
            vm.windSpeed = weather.currently.windSpeed;
            vm.icon = weather.currently.icon;
            vm.summary = weather.minutely.summary;
            vm.precipitation = weather.currently.precipProbability;
          });

        ReverseGeo.get(coordinates).then(function(address) {
          var arrAddress = address[0].address_components;
          $.each(arrAddress, function(i, address_component) {
            if (address_component.types[0] === 'locality') {
              vm.city = address_component.long_name;
              return;
            }
          });
        });
      });
    };

    vm.toggle = function() {
      vm.visible = !vm.visible;
      vm.getCoordinates(vm.addressInput);
      vm.addressInput = '';
    };
  }]);

  weatherControllers.controller('MainController', ['Forecast', 'Geolocation', 'ReverseGeo', function(Forecast, Geolocation, ReverseGeo) {
    var vm = this;
    vm.temperature;
    vm.feelsLike;
    vm.humidity;
    vm.windSpeed;
    vm.icon;
    vm.summary;
    vm.precipitation;
    vm.city;

    Geolocation.get().then(function(coordinates) {
      Forecast.get(coordinates.lat, coordinates.lng)
        .then(function(weather) {
          vm.temperature = weather.currently.temperature;
          vm.feelsLike = weather.currently.apparentTemperature;
          vm.humidity = weather.currently.humidity * 100;
          vm.windSpeed = weather.currently.windSpeed;
          vm.icon = weather.currently.icon;
          vm.summary = weather.minutely.summary;
          vm.precipitation = weather.currently.precipProbability;
        });

      ReverseGeo.get(coordinates).then(function(address) {
        var arrAddress = address[0].address_components;
        $.each(arrAddress, function(i, address_component) {
          if (address_component.types[0] === 'locality') {
            vm.city = address_component.long_name;
            return;
          }
        });
      });
    });
  }]);

})();