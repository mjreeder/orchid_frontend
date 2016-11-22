app.factory('SpecialCollectionsFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/special_collection';

    data.getAllSpecialCollections = function(user) {
        return $http.get(baseUrl);
    };

    data.getSpecialCollectionById = function (id) {
        return $http.get(baseUrl + '/id/' + id);
    };

    data.createSpecialCollection = function (specialCollection) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "name": specialCollection.name,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };



    return data;
});
