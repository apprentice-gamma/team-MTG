(function() {
    var app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'apikey',
        'services',
        'weatherControllers'
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

    // vm.open = openModal;

    // function openModal(size) {
    //     var modalInstance = $modal.open({
    //         templateUrl: './partials/spinner_modal.html',
    //         size: size,

    //     });

    //     modalInstance.result.then(function handleModal(selectedItem) {
    //         $scope.selected = selectedItem;
    //     }, function modalGone() {
    //         $log.info('Modal dismissed at: ' + new Date());
    //     });
    // }
})();