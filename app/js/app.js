(function() {
	var app = angular.module("app", [
		'ngRoute', 
		'ngResource', 
		'apikey'
	]);

	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/main.html'
			}).
			when('/form', {
				templateUrl: 'partials/form.html'
			}).
			when('/destination', {
				templateUrl: 'partials/destination.html'
			});

	}]);

	app.controller('myCoordinates', function($scope){
  var mysrclat= 0; var mysrclong = 0;  
  var init = self.setInterval(function(){$scope.getCoord()}, 1000);
  $scope.getCoord = function($scope) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                mysrclat = position.coords.latitude; 
                mysrclong = position.coords.longitude;
                console.log(mysrclat, mysrclong);
        	});   
    		}
		}
});

	app.controller("testController", ["key", "$http", function(key, $http){
		$http.jsonp("https://api.forecast.io/forecast/"+ key +"/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data){
			console.log(data);
		});

	}]);
})();


