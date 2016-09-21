app.factory('SprayedFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/sprayed';



    data.getPestByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createSpray = function (split) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.start_date
            }
        });
    }

    data.updateSpray = function(split){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "id": split.id,
            }
        });
    }

    return data;
});
