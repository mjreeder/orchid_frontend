app.factory('LocationFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/location';




    data.getTableLocations = function() {
        $http.get(baseUrl);
    }

    data.getTableNameFromID = function(table_id){
        return $http.get(baseUrl + '/' + table_id);
    }

    data.checkTable = function(table_name){
        return $http.get(baseUrl + '/check/' + table_name);
    }







    return data;
});
