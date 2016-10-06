app.factory('TagFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/tag';



    data.getPestByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createTag = function (tag) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": tag.plantId,
                "note": tag.note
            }
        });
    }

    data.updateTag = function(tag){
        return $http({
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
