app.factory('PottingFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/potting';



    data.getBloomByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPest = function (potting) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": potting.plantId,
                "timestamp": potting.start_date
            }
        });
    }

    data.updatePotting = function(potting){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": potting.plantId,
                "timestamp": potting.timestamp,
                "note": potting.note,
                "id": potting.id
            }
        });
    }

    return data;
});
