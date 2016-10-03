app.factory('countryFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/country';


    data.getCountries = function(id){
        return $http.get(baseUrl);
    }



    return data;
});
