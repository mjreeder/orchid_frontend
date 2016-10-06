app.factory('SprayedFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/sprayed';



    data.getPestByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createSplit = function (split) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "note": split.note,
                "recipient" : split.recipient
            }
        });
    }

    data.updateSplit = function(split){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": split.plantId,
                "timestamp": split.timestamp,
                "note": split.note,
                "id": split.id,
                "recipient": split.recipient
            }
        });
    }

    return data;
});
