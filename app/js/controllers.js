(function() {

  var weatherControllers = angular.module('weatherControllers', []);

  weatherControllers.controller("FormController", ["GoogleGeo", "Forecast", "Geolocation", function(GoogleGeo, Forecast, Geolocation) {
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

    vm.getCoordinates = function(address) {
      GoogleGeo.get(address).then(function(coordinates) {
        console.log(coordinates.lat);
        console.log(coordinates.lng);
        Forecast.get(coordinates.lat, coordinates.lng)
          .then(function(weather) {
            vm.temperature = weather.currently.temperature;
            vm.feelsLike = weather.currently.apparentTemperature;
            vm.humidity = weather.currently.humidity * 100;
            vm.windSpeed = weather.currently.windSpeed;
            vm.icon = weather.currently.icon;
            vm.summary = weather.minutely.summary;
            vm.precipitation = weather.currently.precipProbability;
          })
      });
    }

    vm.toggle = function() {
      vm.visible = !vm.visible;
      vm.getCoordinates(vm.addressInput);
      vm.addressInput = "";
    }
  }]);

  weatherControllers.controller("MainController", ["Forecast", "Geolocation", "ReverseGeo", function(Forecast, Geolocation, ReverseGeo) {
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
        // iterate through address_component array
        $.each(arrAddress, function (i, address_component) {
          // console.log("Hello", i, address_component)
          // console.log(address_component.types[0])
          if (address_component.types[0] === "locality") {// locality type
            // console.log("Hello");
            vm.city = address_component.long_name; 
          }// here's your town name
          // return false; // break the loop
        });
      });
    });

  
  }]);
// address[1].address_components[0].long_name
})();