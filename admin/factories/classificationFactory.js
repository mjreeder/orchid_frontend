app.factory('ClassificationFactory', function($http) {

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
                "rank": classification.rank
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
                "id": classification.id
            }
        });
    }

    return data;
});
