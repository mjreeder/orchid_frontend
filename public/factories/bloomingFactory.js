app.factory('BloomingFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/blooming';

    data.getBloomByPlantID = function(plant_id, page = 1) {
        return $http({
            method: "GET",
            url: baseUrl + "/plant_id/" + plant_id + "/page/" + page
        });
    };

    return data;
});
