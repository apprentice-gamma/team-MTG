(function() {

    angular
        .module('app')
        .service('ApiService', ApiService);

    function ApiService(key, $http){
        service.getTemp = function(){
            $http.jsonp("https://api.forecast.io/forecast/"+ key +"/42.332582,-83.045429?callback=JSON_CALLBACK").success(function(data){
            return data;
            })
        };
    };
})();
  
//wat is even going on I don't know
