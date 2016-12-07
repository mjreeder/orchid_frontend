var orchidApp = angular.module('orchidApp');

orchidApp.factory('BloomingFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/blooming';

    data.getBloomByPlantID = function(plant_id, page = 1) {
        return $http({
            method: "GET",
            url: baseUrl + "/plant_id/" + plant_id + "/page/" + page
        });
    };

    data.getAllBloomByPlantID  = function(plant_id) {
        return $http({
            method: "GET",
            url: baseUrl + "/get_all/blooms/plant_id/" + plant_id
        });
    };

    return data;
});
