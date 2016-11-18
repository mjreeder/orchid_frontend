app.controller('DeleteUserViewController', function($scope, $rootScope, UserFactory, $route){

    $scope.newUser = false;


    $scope.allUsers = [];

    UserFactory.getAllUsers().then(function (response){
        var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            var singleUser = data[i];
            if(singleUser.authLevel == 1){
                singleUser.isAuthUser = true;
            } else {
                singleUser.isAthUser = false;
            }
            $scope.allUsers.push(singleUser);
        }

        for (var i = 0; i < $scope.allUsers.length; i ++){
            console.log($scope.allUsers[i]);
        }

    });

    $scope.deleteUserFunction = function(user){

        UserFactory.deleteUser(user).then(function (response) {
            console.log('doe');
            console.log(response);
        });

        $route.reload();

    };


    $scope.closePopUp = function(){
        $rootScope.$broadcast('deleteUser2', true);
    }

});
