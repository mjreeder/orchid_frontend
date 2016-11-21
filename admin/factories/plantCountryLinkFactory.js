app.factory('PlantCountryLinkFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/plant_country_link';



    data.getCountryByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPlantCountryLink = function (plant_country_link) {


        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": plant_country_link.plant_id,
                "country_id": plant_country_link.country_id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }


    data.deleteRelationship = function(plant_country_link){
        return $http({
            method: "PUT",
            url: baseUrl + '/delete',
            data: {
                "country_id": plant_country_link.country_id,
                "plant_id": plant_country_link.plant_id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });

    }

    return data;
});
