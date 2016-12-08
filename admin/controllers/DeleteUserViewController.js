app.controller('DeleteUserViewController', function($scope, $rootScope, UserFactory, $route){

    $scope.newUser = false;

    $scope.allUsers = [];

    $scope.$on('deleteUserData', function(event, data){
        $scope.speificUser = data.user.specificUser;
    });

    UserFactory.getAllUsers().then(function (response){
        var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            var singleUser = data[i];
            if(singleUser.auth_level == 1){
                singleUser.isAuthUser = true;
            } else {
                singleUser.isAthUser = false;
            }
            $scope.allUsers.push(singleUser);
        }
    });

    $scope.deleteUserFunctionPopUp = function(user){
        UserFactory.deleteUser(user).then(function (response) {

        });
        $scope.closePopUp();
        $route.reload();
    };

    $scope.closePopUp = function(){
        $rootScope.$broadcast('deleteUser2', true);
    }

});
