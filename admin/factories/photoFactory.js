app.factory('PhotoFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/photo';



    data.getPhtosByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPhoto = function (photo) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": photo.plantId,
                "url": photo.url,
                "type": photo.type,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updatePhoto = function(photo){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": photo.plantId,
                "url": photo.url,
                "type": photo.type,
                "id": photo.id,
                "active": photo.active,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
