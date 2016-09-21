app.factory('Bloom_CommentFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/bloom_comment';



    data.getBloomByPlantID = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createBloom_Comment = function (bloom_comment) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id": bloom_comment.plantId,
                "timestamp": bloom_comment.timestamp,
                "note": bloom_comment.note
            }
        });
    }

    data.updatebloom_comment = function(bloom_comment){
        $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": bloom_comment.plantId,
                "timestamp": bloom_comment.timestamp,
                "note": bloom_comment.note,
                "id": bloom_comment.id
            }
        });
    }

    return data;
});
