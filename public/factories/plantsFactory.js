app.factory('PlantsFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index) {
        return $http.get(baseUrl + "/alpha/" + alpha + "/" + index);
    };

    data.getAllPlants = function() {
        return $http.get(baseUrl);
    };

    data.getPlantById = function(id) {
        return $http.get(baseUrl + '/' + id);
    };

    data.getPlantByAccessionNumber = function(accessionNumber) {
        return $http.get(baseUrl + '/accession/' + accessionNumber);
    };

    data.getPlantBySearch = function(searchItem, index) {
        return $http.get(baseUrl + '/search_all/' + searchItem + "/" + index);
    };

    data.getByLocationID = function(id) {
        return $http.get(baseUrl + '/table/' + id);
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
    };

    return data;
});
