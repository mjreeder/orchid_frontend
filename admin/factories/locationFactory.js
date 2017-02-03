app.factory('LocationFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin + CONFIG.urlfixForServer +'/orchid_site/public/api/location';

    data.getTableLocations = function() {
        return $http.get(baseUrl);
    }

    data.getTableNameFromID = function(table_id){
        return $http.get(baseUrl + '/' + table_id);
    }

    data.checkTable = function(table_name){
        return $http.get(baseUrl + '/check/' + table_name);
    }

    data.updateTable = function(tableName) {
        return $http({
            method: "POST",
            url: (baseUrl + '/updateTable'),
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







    return data;
});
