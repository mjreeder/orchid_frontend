app.factory('TagFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin + CONFIG.urlfixForServer +'/orchid_site/public/api/tag';



    data.getPestByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    }

    data.createTag = function (tag) {
        return $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "plant_id"    : tag.plant_id,
                "note"        : tag.note,
                "active"      : tag.active,
                "session_key" : $rootScope.userSessionKey,
                "session_id"  : $rootScope.userSessionId
            }
        });
    }

    data.updateTag = function(tag){
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "plant_id": tag.plant_id,
                "note": tag.note,
                "active": tag.active,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.deactivateTag = function(tag){
      return $http({
          method: "PUT",
          url: baseUrl + '/deactive',
          data: {
              "plant_id": tag.plantId,
              "note": tag.note,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    };
    return data;
});
