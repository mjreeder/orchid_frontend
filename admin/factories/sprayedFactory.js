app.factory('SprayedFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/sprayed';



    data.getPestByPlantID = function(plant_id, page) {
        if (page == undefined){
            page = 1;
        }
        return $http({
          method: "GET",
          url: baseUrl + "/plant_id/" + plant_id + "/page/" + page
        });
    }

    data.createSplit = function (split) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "note": split.note,
                "recipient" : split.recipient,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updateSplit = function(split){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "note": split.note,
                "id": split.id,
                "recipient": split.recipient,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.getOneSpray = function(plant_id){
      return $http({
        method: "GET",
        url: baseUrl + "/plant_id/single/" + plant_id
      });
    }

    return data;
});
