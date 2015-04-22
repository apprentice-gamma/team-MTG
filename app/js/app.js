(function() {
	var app = angular.module("app", [
		'ngRoute', 
		'ngResource', 
		'apikey',
    'services'
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
})();


