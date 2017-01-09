app.factory('taxonommyFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/plants/autofill/';

    data.getAutoFillTaxonomy = function(taxonommy, text) {
        return $http.get(baseUrl + taxonommy + '/' + text);
    }

    return data;
});
