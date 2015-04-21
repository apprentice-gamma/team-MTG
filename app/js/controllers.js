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
		coordinates = [coords_obj.D, coords_obj.k];
		console.log(coordinates);
		})
	};
});

})();

