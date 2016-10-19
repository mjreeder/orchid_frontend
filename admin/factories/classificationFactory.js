app.factory('ClassificationFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/classification';

    data.getAllClassifications = function(user) {
        $http.get(baseUrl);
    }

    data.getClassificationById = function(id) {
        $http.get(baseUrl + '/' + id);
    }

    data.createClassification = function(classification) {
        $http({
            method: "POST",
            url: baseUrl,
            data: {
                "name": classification.name,
                "rank": classification.rank,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.editClassification = function(classification) {
        $http({
            method: "PUT",
            url: baseUrl,
            data: {
                "name": classification.name,
                "rank": classification.rank,
                "id": classification.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    return data;
});
