app.controller('BodyViewController', function($scope, UserFactory, $rootScope, $timeout, $location) {


    console.log($scope.userSessionId);
    console.log('we are in the body');
    if($scope.AuthUser){
      UserFactory.getAuth().then(function(response){
          console.log("weeeeeeewwwwwwww");
          var data = response.data.data;
          console.log(data.authLevel);
          if (data.authLevel == 1){
              $rootScope.AuthUser = true;
          } else {
              $rootScope.AuthUser = false;

          }
          //$rootScope.apply();
          //$scope.apply();
      });
    }

    $scope.logoutUser = function(){
      $rootScope.redirect = $location.path();
      $location.path("/logout");
    }

});
