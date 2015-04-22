var weatherControllers = angular.module('weatherControllers', []);

weatherControllers.controller("FormController", ["GoogleGeo", "Forecast", "Geolocation", function(GoogleGeo, Forecast, Geolocation) {
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

weatherControllers.controller("MainController", ["Forecast", "Geolocation", function(Forecast, Geolocation) {
    var vm = this;
    vm.temperature;

    Geolocation.get().then(function(coordinates) {
        console.log(coordinates);
        Forecast.get(coordinates.lat, coordinates.lng)
                .then(function(weather) {
                    console.log(weather.currently);
                    vm.temperature = weather.currently.temperature;
                })
    });


}]);



// (function() {
//     var weatherControllers = angular.module('weatherControllers', []);

//     weatherControllers.controller("FormController", ["GoogleGeo", "Forecast", "Geolocation", function(GoogleGeo, Forecast, Geolocation) {



// })();