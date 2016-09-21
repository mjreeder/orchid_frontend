app.factory('PestFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/pest';



    data.getBloomByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createPest = function (pest) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": blooming.plantId,
                "timestamp": blooming.start_date,
                "note": blooming.note
            }
        });
    }

    data.updatePest = function(pest){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": pest.plantId,
                "timestamp": pest.timestamp,
                "note": blooming.note,
                "id": pest.id
            }
        });
    }

    return data;
});
