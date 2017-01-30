var orchidApp = angular.module('orchidApp');

orchidApp.factory('PlantsFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plants';

    data.getPaginatedPlants = function(alpha, index, itemsPerPage) {
        itemsPerPage = 30;
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

    data.getCount = function(){
        return $http.get(baseUrl + '/getCount');
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

    data.getSubTribes = function(subtribe){
        return $http.get(baseUrl + '/subtribe/' + subtribe);
    };

    data.specificCommonName = function(commonName){
        return $http.get(baseUrl + '/specificCommonName/' + commonName);
    }

    data.checkAccessionNumber = function(accessionNumber){
        return $http.get(baseUrl + '/checkAccessionNumber/' + accessionNumber);
    };

    data.getPlantsFromSubTribe = function(subtribe){
        return $http.get(baseUrl + "/getPlantsFromSubTribe/" + subtribe);
    };

    data.topFiveCollection = function(){
        return $http.get(baseUrl + '/topFiveCollections');
    };

    data.topFiveSubtribes = function(){
        return $http.get(baseUrl + "/topFiveSpecies");
    };

    data.getCountOfTotalPlants = function(){
        return $http.get(baseUrl + "/getCount");
    }

    /**
     * fetch and process top five collections and subtribes
     * @author Brandon Groff
     * @returns {Promise} a promise that resolves to the processed data
     */
    data.topFiveCollectionsAndSubtribes = function() {
      
      var promArr = [
        data.topFiveCollection(),
        data.topFiveSubtribes()
      ];
      
      var returnPromise = new Promise(function(resolve, reject){
        
        Promise.all(promArr).then(function(dataArr){
          
          var specialCollectionsData = dataArr[0].data.data;
          var speciesCollectionsData = dataArr[1].data.data;

          //return arrays
          var returnSpecialCollections = [];
          var returnSubtribesArray = [];

          for(var i = 0; i < specialCollectionsData.length; i++){
              returnSpecialCollections.push(specialCollectionsData[i]);
          }
          
          var lengthOfSpecies = speciesCollectionsData.length > 5 ? 6 : speciesCollectionsData.length;
          
          for(var i = 0; i < lengthOfSpecies; i++){
              if(speciesCollectionsData[i].subtribe_name){
                  var name = speciesCollectionsData[i].subtribe_name;
                  speciesCollectionsData[i].name = name;
                  returnSubtribesArray.push(speciesCollectionsData[i]);
              } 
          }
          
          resolve({
            collections: returnSpecialCollections,
            subtribes: returnSubtribesArray
          });
          
        }, function(error){
          reject(error);
        });
      });
      
      return returnPromise;
      
    };

    return data;
});
