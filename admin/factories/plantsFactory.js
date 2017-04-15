app.factory('PlantsFactory', function($http, $rootScope, CONFIG) {

    var data = {};
    var baseUrl = location.origin + CONFIG.urlfixForServer +'/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index) {
        return $http.get(baseUrl + "/alpha/" + alpha + "/" + index);
    }

    data.getAllPaginatedPlants = function(index){
      return $http.get(baseUrl + "/page/" + index);
    }

    data.getAllPlants = function() {
        return $http.get(baseUrl);
    }

    data.getAmountOfPages = function(){
      return $http.get(baseUrl + "/pages/amount");
    }

    data.getPlantById = function(id) {
        return $http.get(baseUrl + '/' + id);
    }

    data.getPlantByAccessionNumber = function(accessionNumber) {
        return $http.get(baseUrl + '/accession/' + accessionNumber);
    }

    data.getPlantBySearch = function(searchItem, index) {
        return $http.get(baseUrl + '/search_all/' + searchItem + "/" + index);
    }

    data.getByLocationID = function(id) {
        return $http.get(baseUrl + '/table/' + id);
    }

    data.createNew = function(plant) {
        return $http({
            method: "POST",
            url: baseUrl + '/createPlant',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.checkAccessionNumber = function(accession_number){
        return $http({
            method: "GET",
            url: baseUrl + '/checkAccessionNumber/' + accession_number,
            data: {
            }
        });
    };

    data.inactivePlant = function(plant_id){
        console.log("THis is the plant_id" + plant_id );
        return $http({
            method: "PUT",
            url: baseUrl + '/inactivePlant',
            data: {
                "plant_id" : plant_id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    }

    data.getDistinctCount = function(){
        return $http({
            method: "GET",
            url: baseUrl + '/getDistinctCount',
            data: {
            }
        });
    };

    data.getCount = function(){
        return $http.get(baseUrl + '/getCount');
    };


    data.getDeadPlantsInYear = function(){
        return $http({
            method: "GET",
            url: baseUrl + '/dead_date_year',
            data: {
            }
        });
    }

    data.updateGeneralNotes = function (plant){
        return $http({
            method: "PUT",
            url: baseUrl + '/updateGeneralNotes',
            data: {
                "general_note": plant.general_note,
                "plant_id" : plant.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.updateVarifiedDate = function(id) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateVarifiedDate',
            data: {
                "id": id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editCriticalPlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateCritical',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }

        });
    };

    data.editCritialPlantTable = function(table) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateCriticalTable',
            data: {
                "table": table,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    }

    data.editCulturePlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateCulture',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editAccessionPlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateAccession',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editInactivePlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateInactive',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editTaxonmicPlant = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateTaxonmic',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editSinglePhoto = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateSinglePhoto',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editDescription = function(data) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateDescription',
            data: {
                "plant": data,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editHybird = function(plant) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateHybrid',
            data: {
                "plant": plant,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        });
    };

    data.editLocation = function(data) {
        return $http({
            method: "PUT",
            url: baseUrl + '/updateLocation',
            data: {
                "id": data.id,
                "name" : data.name,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    };
    //
    //accession_number: plant.accession_number,
    //    scientific_name: plant.scientific_name,
    //    name: plant.commonName

    data.deletePlant = function(id) {
        return $http({
            method: "DELETE",
            url: baseUrl + '/' + id,
            data: {
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    };

    data.getPhoto = function(){
        return $http({
            method: "GET",
            url: "https://api.box.com/2.0/files/98747341454/thumbnail.jpg",
            headers: {
                'Authorization': 'Bearer SpfobNxpqmsUeSz2D5m17FSp2mnVJEWt',
                'Content-Type': 'application/json'
            }

        })
    }

    data.updateCollection = function(data){
        return $http({
            method: "PUT",
            url: baseUrl + '/updateSpecialCollection',
            data: {
                'name' : data.name,
                'id' : data.id,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    };




    return data;
});
