(function() {
	var app = angular.module("app", ['ngRoute', 'ngResource', 'apikey']);

	app.controller("testController", ["key", "$http", function(key, $http){
		$http.jsonp("https://api.forecast.io/forecast/"+ key +"/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data){
			console.log(data);
		});

	}]);
})();
