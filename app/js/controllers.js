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



(function() {
  var dictatorControllers = angular.module('dictatorControllers', []);

  dictatorControllers.controller('dictatorListCtrl', ['DictatorService', function(DictatorService) {
    var self = this;
    self.dictators = [];
    self.dictators = DictatorService.query();
  }]);

  dictatorControllers.controller('dictatorProfileCtrl', ['DictatorService', '$routeParams', 'Bios', function(DictatorService, $routeParams, Bios) {
    var self = this;
    self.dictator = DictatorService.get({id: $routeParams.dictatorId});
    self.randomBio = Bios[Math.floor(Math.random() * Bios.length)];
    self.randomNum = Math.floor(Math.random() * 22) + 1;
    self.totalProles = function(){
      var count = 0;
      for (i=0; i < self.dictator.owned_households.length; i++)
        count += self.dictator.owned_households[i].residents.length;
      
      return count;
    }
    self.totalIncome = function(){
      var count = 0;
      for (i=0; i < self.dictator.owned_households.length; i++)
        count += self.dictator.owned_households[i].household_income;
      return count;
    }
  }]);

  dictatorControllers.controller('modalCtrl', ['$scope', function($scope) {
    var self = this;
    self.modalShown = true;
    self.toggleModal = function() {
      self.modalShown = !self.modalShown;
    };
  }]);

})();

