app.factory('BloomingFactory', function($http, $rootScope, CONFIG) {

  var data = {};
  var baseUrl = location.origin + CONFIG.urlfixForServer +'/orchid_site/public/api/blooming';



  data.getBloomByPlantID = function(plant_id, page) {
    if (page == undefined) {
      page = 1;
    }
    return $http({
      method: "GET",
      url: baseUrl + "/plant_id/" + plant_id + "/page/" + page
    });
  }

  data.getAllBloomByPlantID = function(plant_id) {
    return $http({
      method: "GET",
      url: baseUrl + "/get_all/blooms/plant_id/" + plant_id
    });
  };

  data.getGraphData = function(plant_id){
    return $http({
      method: "GET",
      url: baseUrl + "/graphData/" + plant_id
    });
  };

  data.createBloom = function(blooming) {
    return $http({
      method: "POST",
      url: baseUrl + '/create',
      data: {
        "plant_id": blooming.plantId,
        "start_date": blooming.start_date,
        "end_date": "0000-00-00",
        "session_id": $rootScope.userSessionId,
        "session_key": $rootScope.userSessionKey
      }
    });
  }

  data.createGenericBloom = function(blooming) {
    return $http({
      method: "POST",
      url: baseUrl + '/createGenericBloom',
      data: {
        "plant_id": blooming.plantId,
        "start_date": blooming.start_date,
        "end_date": blooming.end_date,
        "session_id": $rootScope.userSessionId,
        "session_key": $rootScope.userSessionKey
      }
    });
  }

  data.updateBloom = function(blooming) {
    return $http({
      method: "PUT",
      url: baseUrl + '/update',
      data: {
        "plant_id": blooming.plantId,
        "end_date": blooming.end_date,
        "start_date": blooming.start_date,
        "id": blooming.id,
        "session_id": $rootScope.userSessionId,
        "session_key": $rootScope.userSessionKey
      }
    });
  }

  data.deleteBloom = function(blooming) {
    return $http({
      method: "PUT",
      url: baseUrl + '/delete',
      data: {
        "id": blooming.id,
        "session_id": $rootScope.userSessionId,
        "session_key": $rootScope.userSessionKey
      }
    });
  }

  return data;
});
