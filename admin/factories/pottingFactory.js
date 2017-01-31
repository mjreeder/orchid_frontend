app.factory('PottingFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/potting';


    data.getAllPottingFromPlantID = function(plant_id){
        return $http({
            method: "GET",
            url: baseUrl + "/allPotting/" + plant_id
        });
    };

    data.getBloomByPlantID = function(plant_id, page) {
        if (page == undefined){
            page = 1;
        }
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
                "id": potting.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.getOnePot = function(plant_id){
      return $http({
        method: "GET",
        url: baseUrl + "/plant_id/single/" + plant_id
      });
    };

    data.deletePotting = function(potting){
        return $http({
            method: "PUT",
            url: baseUrl + '/delete',
            data: {
                "id": potting.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }



    return data;
});
