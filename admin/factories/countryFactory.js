app.factory('countryFactory', function($http) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/country';


    data.getCountries = function(id){
        return $http.get(baseUrl);
    }



    return data;
});
