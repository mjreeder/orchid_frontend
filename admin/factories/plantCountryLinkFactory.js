app.factory('plantCountryLinkFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/plant_country_link';



    data.getCountryByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPest = function (plant_country_link) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": plant_country_link.plantId,
                "country_id": plant_country_link.country_id,

            }
        });
    }

    data.updatePest = function(plant_country_link){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": plant_country_link.plantId,
                "country_id": plant_country_link.countryId,
                "id": plant_country_link.id
            }
        });
    }

    return data;
});
