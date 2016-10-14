app.factory('SessionFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/users';

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

    data.getUserFromSessionKey = function(session_key){
      return $http.get(baseUrl + '/session_key/' + session_key);
    }


    return data;
});
