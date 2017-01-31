app.factory('splitFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/split';

    data.getSplitForPlantId = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createNewSplit = function(plantSplit, plant_id) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": plant_id,
                "recipient": plantSplit.recipient,
                "timestamp": plantSplit.timestamp,
                "note": plantSplit.note,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updateSplits = function(plantSplit, plant_id) {
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": plant_id,
                "id": plantSplit.id,
                "recipient": plantSplit.recipient,
                "timestamp": plantSplit.timestamp,
                "note": plantSplit.note,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.addLetter = function(plant_id) {
        return $http({
            method: "PUT",
            url: baseUrl + '/add_letter/' + plant_id,
            data : {
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.makeDonation = function(plant_id) {
        return $http({
            method: "PUT",
            url: baseUrl + '/donation/' + plant_id,
            data : {
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
              }
        });
    }

    return data;
});
