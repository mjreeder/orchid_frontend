app.factory('PhotoFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/photos';



    data.getPhtosByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.getSimilarPhotos = function(name){
        return $http.get(baseUrl + "/getSimilarPlants/" + name);
    };

    data.createPhoto = function (photo) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": photo.plant_id,
                "url": photo.url,
                "type": photo.type,
                "fileName": photo.fileName,
                "thumb_url" : photo.thumb_url,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.updatePhoto = function(photo){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": photo.plant_id,
                "url": photo.url,
                "type": photo.type,
                "id": photo.id,
                "active": photo.active,
                "fileName" : photo.fileName,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.deletePhoto = function(photo){
        console.log("we are here at the delete stage");
        console.log(photo);
        return $http({
            method: "PUT",
            url: baseUrl + '/deactive',
            data: {
                "id": photo.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
