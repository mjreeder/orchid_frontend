app.factory('PlantsFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index) {
        $http.get(baseUrl + "/alpha/" + alpha + "/" + index);
    }

    data.getAllPlants = function() {
        $http.get(baseUrl);
    }

    data.getPlantById = function(id) {
        $http.get(baseUrl + '/' + id);
    }

    data.getPlantByAccessionNumber = function(accessionNumber) {
        $http.get(baseUrl + '/' + accessionNumber);
    }

    data.createNewPlant = function(plant) {
        $http({
          method: "POST",
          url: baseUrl + '/',
          data: plant
        });
    }

    data.editPlant = function(plant) {
      $http({
        method: "PUT",
        url: baseUrl + '/',
        data: plant
      });
    }

    data.deletePlant = function(id) {
      $http.delete(baseUrl + '/' + id);
    }

    return data;
});
