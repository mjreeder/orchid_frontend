app.factory('UserFactory', function($http, sessionService, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/users';

    data.newUser = function(user) {
      return $http({
          method: "POST",
          url: baseUrl,
          data: {
              "first_name"   : user.first_name,
              "last_name"    : user.last_name,
              "email"       : user.email,
              "password"    : user.password,
              "auth_level"   : user.auth_level,
              "session_id"  : $rootScope.userSessionKey,
              "session_key" : $rootScope.userSessionId
          }
      });
    }

    data.updateUser = function (user){
        console.log("here is one user");
        console.log(user);
        return $http({
            method: "PUT",
            url: baseUrl + '/update',
            data: {
                "first_name"   : user.first_name,
                "last_name"    : user.last_name,
                "email"       : user.email,
                "auth_level"   : user.auth_level,
                "id" : user.id,
                "session_id"  : $rootScope.userSessionKey,
                "session_key" : $rootScope.userSessionId
            }
        })
    }

    data.deleteUser = function(user){
      return $http({
          method: "POST",
          url: baseUrl + '/delete/' + user.id,
          data: {
              "id": user.id,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    };

    data.getAuth = function(){
        return $http({
            method: "PUT",
            url: baseUrl + '/getAuth',
            data: {
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey,
                "key" : $rootScope.userSessionId

            }
        });
    }

    data.getAllUsers = function(){
        return $http({
            method: "GET",
            url: baseUrl + '/allUsers',
            data: {

            }

        });
    };

    data.changePassword = function(user){
        return $http({
            method: "PUT",
            url: baseUrl + '/update_user_password',
            data:{
                "id" : user.id,
                "newPassword" : user.newPassword,
                "email" : user.email,
                "session_id": $rootScope.userSessionId,
                "session_key": $rootScope.userSessionKey
            }
        })
    }

    return data;
});
