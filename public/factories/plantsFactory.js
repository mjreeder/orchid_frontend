var orchidApp = angular.module('orchidApp');

orchidApp.factory('PlantsFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index, itemsPerPage = 30) {
        return $http.get(baseUrl + "/alpha/" + alpha + "/" + index + "/" + itemsPerPage);
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

    //get the current Blooming ones
    data.getCurrentBlooming = function(){
        return $http.get(baseUrl + '/getBlooming');
    };

    //get the countries
    data.getCountries = function(countries){
        return $http.get(baseUrl + '/getCountries/' + countries);
    };

    //get the collections
    data.getCollections = function(collection){
        return $http.get(baseUrl + '/getCollections/' + collection);
    };

    //get the common name
    data.getCollections = function(letter){
        return $http.get(baseUrl + '/commonName/' + letter);
    };

    //get the subtribes
    data.getCollections = function(subtribe){
        return $http.get(baseUrl + '/subtribe/' + subtribe);
    };

    data.specificCommonName = function(commonName){
        return $http.get(baseUrl + '/specificCommonName/' + commonName);
    }





    return data;
});
