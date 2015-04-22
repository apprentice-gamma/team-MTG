(function() {
    var weatherControllers = angular.module('weatherControllers', []);

    weatherControllers.controller("FormController", function() {
        var vm = this;
        vm.addressInput = '';
        vm.outsideCoordinates = [];
        vm.geocoder = new google.maps.Geocoder();
        vm.getCoordinates = function(address, callback) {
            var coordinates;
            vm.geocoder.geocode({
                address: address
            }, function(results, status) {
                coords_obj = results[0].geometry.location;
                coordinates = [String(coords_obj.D), String(coords_obj.k)];
                var longitude = String(coords_obj.D);
                var latitude = String(coords_obj.k);
                vm.outsideCoordinates.push(latitude);
                vm.outsideCoordinates.push(longitude);
                console.log(vm.outsideCoordinates + "  outsidecoordinates inside anon function");

                //console.log(coordinates + "  INSIDE DAMN anon function");
                
            });
            //console.log(coordinates + "  outside of anon function");
            console.log(vm.outsideCoordinates + "  outsidecoordinates outside anon function");
        };


        // vm.getTemps = function(key, $http) {
        //     // var longitude = vm.getCoordinates[0];
        //     // var latitude = vm.getCoordinates[0];
        //     $http.jsonp("https://api.forecast.io/forecast/" + key + "/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data) {
        //         console.log(data);
        //     });
        // };
    });

    weatherControllers.controller("ApiController", ["key", "$http", function(key, $http) {
        $http.jsonp("https://api.forecast.io/forecast/" + key + "/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data) {
            console.log(data);
        });

    }]);

})();