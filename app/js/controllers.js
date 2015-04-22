(function() {
    var weatherControllers = angular.module('weatherControllers', []);

    weatherControllers.controller("FormController", function() {
        var vm = this;
        vm.addressInput = '';
        vm.geocoder = new google.maps.Geocoder();
        // vm.getCoordinates = function(address, callback) {
        //     var coordinates;
        //     vm.geocoder.geocode({
        //         address: address
        //     }, function(results, status) {
        //         coords_obj = results[0].geometry.location;
        //         coordinates = [String(coords_obj.D), String(coords_obj.k)];
        //         console.log(coordinates + "  INSIDE DAMN anon function");

        //     });
        //     console.log(coordinates + "  outside of anon function");

        // };

        vm.initialize = function() {
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(40.730885, -73.997383);
            vm.codeLatLng(function(addr) {
                console.log(addr);
            });
        }

        vm.codeLatLng = function(callback) {
            var latlng = new google.maps.LatLng(40.730885, -73.997383);
            if (geocoder) {
                geocoder.geocode({
                    'latLng': latlng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            callback(results[1].formatted_address);
                        } else {
                            alert("No results found");
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                });
            }
        }


        // function codeAddress(address, callback) {
        //     (new google.maps.Geocoder()).geocode({
        //         'address': address
        //     }, function(results, status) {
        //         if (status == google.maps.GeocoderStatus.OK) {
        //             callback(String(results[0].geometry.location.Ya) + ',' + String(results[0].geometry.location.Za))
        //         } else {
        //             callback(status);
        //         }
        //     });
        // }

        // codeAddress("test", function(result) {
        //     // do stuff with result
        // });


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