app.factory('LocationFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/location';

    data.getLocationByPlantID = function(plant_id) {
        $http.get(baseUrl);
    }

    return data;
});
