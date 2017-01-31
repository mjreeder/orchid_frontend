var orchidApp = angular.module('orchidApp');

orchidApp.factory('ClassificationFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/classification';

    data.getAllClassifications = function(user) {
        $http.get(baseUrl);
    };

    data.getClassificationById = function(id) {
        $http.get(baseUrl + '/' + id);
    };

    return data;
});
