app.factory('ClassificationFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/classification';

    data.getAllClassifications = function(user) {
        $http.get(baseUrl);
    };

    data.getClassificationById = function(id) {
        $http.get(baseUrl + '/' + id);
    };

    return data;
});
