app.factory('VerifiedFactory', function($http, sessionService, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/verified';

    data.getLastVerifiedDate = function(plant_id) {
        return $http({
            method: "GET",
            url: baseUrl + '/last/plant_id/' + plant_id,
            data: {}
        });
    };

    data.getAllVerifiedForPlantID = function(plant_id){
        return $http({
            method: "GET",
            url: baseUrl + '/plant_id/' + plant_id,
            data: {}
        });
    };

    data.createVerified = function(info){
        console.log("this is the factory");
        console.log(info.plant_id);
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": info.plant_id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.updateVerified = function(verifiedInformation){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": verifiedInformation.plant_id,
                "verified_date": verifiedInformation.verified_date,
                "id": verifiedInformation.id,
                "active": verifiedInformation.active,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };



    return data;
});
