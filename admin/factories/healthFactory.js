app.factory('HealthFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/health';

    data.createHealth = function(healthLink) {
        return $http({
            method: "POST",
            url: (baseUrl + '/create'),
            data: {
                "plant_id": healthLink.plantId,
                "timestamp": healthLink.timestamp,
                "score": healthLink.score,
                "comment": healthLink.comment,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.editHealth = function (healthLink) {
        return $http({
            method: 'PUT',
            url: baseUrl + '/update',
            data: {
                "id": healthLink.id,
                "plant_id": healthLink.plant_id,
                "timestamp": healthLink.timestamp,
                "score": healthLink.score,
                "comment": healthLink.comment,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    }

    data.getHealthBtPlantID = function(id){
        return $http.get(baseUrl + '/plant_id/' + id);
    }

    return data;
});
