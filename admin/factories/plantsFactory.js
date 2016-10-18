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

    data.getPlantBySearch = function (searchItem, index) {
      return $http.get(baseUrl + '/search_all/' + searchItem + "/" + index);
    }

    data.getByLocationID = function (id){
        return $http.get(baseUrl + '/table/' + id);
    }

    data.createNewPlant = function(plant) {
        return $http({
          method: "POST",
          url: baseUrl + '/createPlant',
          data: plant
        });
    };



    data.updateVarifiedDate = function(plant){
        return $http({
            method: "PUT",
            url: baseUrl + '/updateVarifiedDate',
            data: plant
        });
    };

    data.editCriticalPlant = function(plant) {
      return $http({
        method: "PUT",
        url: baseUrl + '/updateCritical',
        data: plant
      });
    };

    data.editCritialPlantTable = function(table){
        return $http({
            method: "PUT",
            url: baseUrl + '/updateCriticalTable',
            data:table
        })
    }

    data.editCulturePlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateCulture',
            data: plant
        });
    };

    data.editAccessionPlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateAccession',
            data: plant
        });
    };

    data.editInactivePlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateInactive',
            data: plant
        });
    };

    data.editTaxonmicPlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateTaxonmic',
            data: plant
        });
    };

    data.editSinglePhoto = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateSinglePhoto',
            data: plant
        });
    };

    data.editDescription = function(aaa) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateDescription',
            data: aaa
        });
    };

    data.editHybird = function(plant){
        return $http({
            method: "PUT",
            url: baseUrl + '/upateHyrbrid',
            data: plant
        });
    };

    data.editLocation = function(plant){
      return $http({
          method: "PUT",
          url: baseUrl + '/updateLocation',
          data: plant
      })
    };
    //
    //accession_number: plant.accession_number,
    //    scientific_name: plant.scientific_name,
    //    name: plant.commonName

    data.deletePlant = function(id) {
      return $http.delete(baseUrl + '/' + id);
    };



    return data;
});
