app.factory('TagFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/tag';



    data.getPestByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createTag = function (tag) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": tag.plantId,
                "note": tag.note
            }
        });
    }

    data.updateTag = function(tag){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": tag.plantId,
                "note": tag.note
            }
        });
    }

    return data;
});
