app.factory('HealthFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/health';

    data.createHealth = function(healthLink) {
        $http({
            method: "POST",
            url: (baseUrl + '/create'),
            data: {
                "plantId": healthLink.plantId,
                "timestamp": healthLink.timestamp,
                "score": healthLink.score
            }
        });
    }

    data.editHealth = function (healthLink) {
        $http:({
            method: 'PUT',
            url: baseUrl + '/update',
            data: {
                "id": healthLink.id,
                "plant_id": healthLink.plant_id,
                "timestamp": healthLink.timestamp,
                "score": healthLink.score
            }
        })
    }

    data.getHealthBtPlantID = function(id){
        $http.get(baseUrl + '/plant_id/' + plant_id);
    }

    return data;
});
