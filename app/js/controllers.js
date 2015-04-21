(function() {
	var weatherControllers = angular.module('weatherControllers', []);

	weatherControllers.controller("FormController", function(){
    	var vm = this;
    	vm.addressInput = '';
		vm.geocoder = new google.maps.Geocoder();
		vm.getCoordinates = function(address) {
			var coordinates;
			vm.geocoder.geocode({address: address}, function (results, status) {
			coords_obj = results[0].geometry.location;
			var latitude = String(coords_obj.k);
			var longitude = String(coords_obj.D); 
			console.log(latitude + longitude);
			console.log(typeof latitude + typeof longitude);
			})
		};
	});

	weatherControllers.controller("apiController", ["key", "$http", function(key, $http){
		$http.jsonp("https://api.forecast.io/forecast/"+ key +"/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data){
			console.log(data);
		});

	}]);

})();

