app.factory('PlantsFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index) {
        return $http.get(baseUrl + "/alpha/" + alpha + "/" + index);
    }

    data.getAllPlants = function() {
        return $http.get(baseUrl);
    }

    data.getPlantById = function(id) {
        return $http.get(baseUrl + '/' + id);
    }

    data.getPlantByAccessionNumber = function(accessionNumber) {
          return $http.get(baseUrl + '/accession/' + accessionNumber);
    }

    data.getPlantBySearch = function (searchItem) {
      return $http.get(baseUrl + '/search_all/' + searchItem);
    }

    data.getByLocationID = function (id){
        return $http.get(baseUrl + '/table/' + id);
    }

    data.createNewPlant = function(plant) {
        return $http({
          method: "POST",
          url: baseUrl + '/',
          data: plant
        });
    }

    data.editCriticalPlant = function(aaa) {
      return $http({
        method: "PUT",
        url: baseUrl + '/updateCritical',
        data: aaa
      });
    }
    //
    //accession_number: plant.accession_number,
    //    scientific_name: plant.scientific_name,
    //    name: plant.commonName

    data.deletePlant = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };



    return data;
});
