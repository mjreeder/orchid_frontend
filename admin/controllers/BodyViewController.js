app.controller('BodyViewController', function($scope, UserFactory, $rootScope, $timeout, $location) {
    if($scope.AuthUser){
      UserFactory.getAuth().then(function(response){
          var data = response.data.data;
          if (data.auth_level == 1){
              $rootScope.AuthUser = true;
          } else {
              $rootScope.AuthUser = false;
          }
      });
    }

    $scope.logoutUser = function(){
      $rootScope.redirect = $location.path();
      $location.path("/logout");
    }
});
