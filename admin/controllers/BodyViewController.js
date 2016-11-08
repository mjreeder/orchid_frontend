app.controller('BodyViewController', function($scope, UserFactory, $rootScope, $timeout) {


    console.log($scope.userSessionId);
    $scope.AuthUser = $rootScope.isLoggedIn;
    console.log('we are in the body');
    UserFactory.getAuth().then(function(response){
        console.log("weeeeeeewwwwwwww");
        var data = response.data.data;
        console.log(data.authLevel);
        if (data.authLevel == 1){
            $scope.AuthUser = true;
        } else {
            $scope.AuthUser = false;

        }
        //$rootScope.apply();
        //$scope.apply();
    });

});
