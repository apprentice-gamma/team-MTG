angular.module('weatherApp').controller("FormController", function(){
    var vm = this;
    vm.addressInput = '';
    vm.logMe = function(){console.log('You are in the MainController');}
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
