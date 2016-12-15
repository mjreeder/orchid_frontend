app.factory('PestFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'2016/orchid_site/public/api/pest';



    data.getPestByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPest = function (pest) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": pest.plantId,
                "timestamp": pest.start_date,
                "note": pest.note,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updatePest = function(pest){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": pest.plantId,
                "timestamp": pest.timestamp,
                "note": blooming.note,
                "id": pest.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
