var orchidApp = angular.module('orchidApp');

orchidApp.factory('SpeicalCollectionsFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/special_collection';

    data.getSpeicalCollections = function() {
        return $http.get(baseUrl);
    };

    data.getBySpecificID = function(id){
        return $http.get(baseUrl + '/id/' + id);
    };

    data.getPlantsWithSpecificID = function(id){
        return $http.get(baseUrl + '/plants/' + id);
    };

    return data;
});
