app.factory('BloomingFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/blooming';



    data.getBloomByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createBloom = function (blooming) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": blooming.plantId,
                "start_date": blooming.start_date,
                "end_date": "0000-00-00"
            }
        });
    }

    data.updateBloom = function(blooming){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": blooming.plantId,
                "end_date": blooming.end_date,
                "start_date": blooming.start_date,
                "id": blooming.id
            }
        });
    }

    return data;
});
