app.factory('taxonommyFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plants/autofill/';

    data.getAutoFillTaxonomy = function(taxonommy, text) {
        return new Promise(function(resolve, reject){
          var autoFillOptions =[];
          $http.get(baseUrl + taxonommy + '/' + text).then(function(response){
            var responseAllCollections = response.data.data;
            for(var i = 0; i < responseAllCollections.length; i++){
              autoFillOptions.push(responseAllCollections[i]);
            }
            resolve(autoFillOptions);
          }, function(error){
            reject(error);
          });
        });
    }

    return data;
});
