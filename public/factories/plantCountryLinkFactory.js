app.factory('PlantCountryLinkFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plant_country_link';

    data.getCountryByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    };


    return data;
});
