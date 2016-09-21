app.factory('ClassificationFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/users';

    data.login = function(email, password) {
        $http({
            method: "POST",
            url: baseUrl + '/login',
            data: {
                "email": email,
                "password": password
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
