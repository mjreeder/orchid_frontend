app.factory('UserFactory', function($http, sessionService, $rootScope) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/users';

    data.newUser = function(user) {
      $http({
          method: "POST",
          url: baseUrl,
          data: {
              "fisrtName"   : user.firstName,
              "lastName"    : user.lastName,
              "email"       : user.email,
              "password"    : user.password,
              "authLevel"   : user.authLevel,
              "session_id"  : $rootScope.userSessionKey,
              "session_key" : $rootScope.userSessionId
          }
      });
    }

    data.deleteUser = function(user){
      $http({
          method: "DELETE",
          url: baseUrl,
          data: {
              "id": user.id,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    }

    return data;
});
