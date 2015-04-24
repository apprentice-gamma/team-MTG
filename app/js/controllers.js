(function() {

  var weatherControllers = angular.module('weatherControllers', []);

  weatherControllers.controller('MainController', ['Forecast', 'Geolocation', 'ReverseGeo', function(Forecast, Geolocation, ReverseGeo) {
    var vm = this;
    vm.temperature;
    vm.feelsLike;
    vm.humidity;
    vm.windSpeed;
    vm.icon;
    vm.summary;
    vm.precipitation;
    vm.firstHour;
    vm.secondHour;
    vm.thirdHour;
    vm.firstHourTemp;
    vm.secondHourTemp;
    vm.thirdHourTemp;
    vm.city;

    vm.dataLoading = true;

    Geolocation.get().then(function(coordinates) {
      Forecast.get(coordinates.lat, coordinates.lng)
        .then(function(weather) {
          vm.temperature = Math.floor(weather.currently.temperature);
          vm.feelsLike = weather.currently.apparentTemperature;
          vm.humidity = weather.currently.humidity * 100;
          vm.windSpeed = weather.currently.windSpeed;
          vm.icon = weather.currently.icon;
          vm.summary = weather.minutely.summary;
          vm.precipitation = weather.currently.precipProbability;
          vm.firstHour = weather.hourly.data[1].time * 1000;
          vm.secondHour = weather.hourly.data[2].time * 1000;
          vm.thirdHour = weather.hourly.data[3].time * 1000;
          vm.firstHourTemp = weather.hourly.data[1].temperature;
          vm.secondHourTemp = weather.hourly.data[2].temperature;
          vm.thirdHourTemp = weather.hourly.data[3].temperature;
          vm.utterance = new SpeechSynthesisUtterance("For your current location the temperature is " + vm.temperature + "degrees fahrenheit and the forecast is " + vm.summary);
          vm.lady = window.speechSynthesis.speak(vm.utterance);
        }).finally(function() {
          vm.dataLoading = false;
        });

      ReverseGeo.get(coordinates).then(function(address) {
        var arrAddress = address[0].address_components;
        $.each(arrAddress, function(i, address_component) {
          if (address_component.types[0] === 'locality') {
            if (address_component.long_name.length > 15) {
              vm.city = address_component.long_name.slice(0, 14) + '...';
            } else {
              vm.city = address_component.long_name;
            }
            return;
          }
        });
      });
    });
  }]);

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
            vm.temperature = Math.floor(weather.currently.temperature);
            vm.feelsLike = weather.currently.apparentTemperature;
            vm.humidity = weather.currently.humidity * 100;
            vm.windSpeed = weather.currently.windSpeed;
            vm.icon = weather.currently.icon;
            vm.summary = weather.minutely.summary;
            vm.precipitation = weather.currently.precipProbability;
            vm.utterance = new SpeechSynthesisUtterance("For your destination location the temperature is " + vm.temperature + "degrees fahrenheit and the forecast is " + vm.summary);
            vm.lady = window.speechSynthesis.speak(vm.utterance);
          });

        ReverseGeo.get(coordinates).then(function(address) {
          var arrAddress = address[0].address_components;
          $.each(arrAddress, function(i, address_component) {
            if (address_component.types[0] === 'locality') {
              if (address_component.long_name.length > 15) {
                vm.city = address_component.long_name.slice(0, 14) + '...';
              } else {
                vm.city = address_component.long_name;
              }
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
})();