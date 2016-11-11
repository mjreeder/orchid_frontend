app.factory('PottingFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/potting';



    data.getBloomByPlantID = function(plant_id, page = 1) {
        return $http({
          method: "GET",
          url: baseUrl + "/plant_id/" + plant_id + "/page/" + page
        })
    }

    data.createPest = function (potting) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": potting.plantId,
                "timestamp": potting.timestamp,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updatePotting = function(potting){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": potting.plantId,
                "timestamp": potting.timestamp,
                "note": potting.note,
                "id": potting.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
