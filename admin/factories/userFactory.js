app.factory('UserFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/users';

    data.newUser = function(user) {
      $http({
          method: "POST",
          url: baseUrl,
          data: {
              "fisrtName": user.firstName,
              "lastName": user.lastName,
              "email" : user.email,
              "password": user.password,
              "authLevel" : user.authLevel
          }
      });
    }

    data.deleteUser = function(user){
      $http({
          method: "DELETE",
          url: baseUrl,
          data: {
              "id": user.id,
          }
      });
    }

    return data;
});
