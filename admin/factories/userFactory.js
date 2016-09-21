orchid.factory('UserFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/user';

    data.login = function() {
        $http.get(baseUrl );

    return data;
});
