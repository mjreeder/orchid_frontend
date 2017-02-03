app.factory('countryFactory', function($http, CONFIG) {

    var data = {};
    var baseUrl = location.origin +CONFIG.urlfixForServer +'/orchid_site/public/api/country';


    data.getCountries = function(id){
        return $http.get(baseUrl);
    }



    return data;
});
