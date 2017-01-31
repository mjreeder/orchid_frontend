var orchidApp = angular.module('orchidApp');

orchidApp.factory('countryFactory', function($http) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/country';


    data.getCountries = function(id){
        return $http.get(baseUrl);
    };

    data.getCurrentCountires = function(id){
        return $http.get(baseUrl+ '/currentCountries');
    };

    return data;
});
