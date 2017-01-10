app.factory('SessionFactory', function($http) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/users';

    data.login = function(credentials) {

        return $http({
            method: "POST",
            url: baseUrl + '/login',
            data: {
                "email": credentials.username,
                "password": credentials.password
            }
        });
    }

    data.logout = function(sessionId, userId) {
      $http({
          method: "POST",
          url: baseUrl + '/logout',
          data: {
              "sessionId": sessionId,
              "userId": userId
          }
      });
    }


    return data;
});
