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
                        vm.utterance = new SpeechSynthesisUtterance("temperature is " + vm.temperature + "fahrenheit and the forecast is " + vm.summary);
                        vm.lady = window.speechSynthesis.speak(vm.utterance);
                    })
            });
        }

        vm.toggle = function() {
            vm.visible = !vm.visible;
            vm.getCoordinates(vm.addressInput);
            vm.addressInput = "";
        }

        // Geolocation.get().then(function(coordinates) {
        //   console.log(coordinates);
        // });


    }]);

    weatherControllers.controller("MainController", ["Forecast", "Geolocation", function(Forecast, Geolocation) {
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
                    vm.firstHour = weather.hourly.data[1].time * 1000;
                    vm.secondHour = weather.hourly.data[2].time * 1000;
                    vm.thirdHour = weather.hourly.data[3].time * 1000;
                    vm.firstHourTemp = weather.hourly.data[1].temperature;
                    vm.secondHourTemp = weather.hourly.data[2].temperature;
                    vm.thirdHourTemp = weather.hourly.data[3].temperature;
                    vm.utterance = new SpeechSynthesisUtterance("temperature is " + vm.temperature + "fahrenheit and the forecast is " + vm.summary);
                    vm.lady = window.speechSynthesis.speak(vm.utterance);
                })
        });
    }]);

})();