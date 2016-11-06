app.controller('RegisterViewController', function($scope, $rootScope, UserFactory, $route){


    $scope.allUsers = [];

    UserFactory.getAllUsers().then(function (response){
       var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            $scope.allUsers.push(data[i]);
        }

        for (var i = 0; i < $scope.allUsers.length; i ++){
            console.log($scope.allUsers[i]);
        }

    });
    $scope.changePassword = true;


    $scope.changePasswordFunction = function(user){
        console.log(user);
        console.log("we are here");
        $scope.changePassword = false;
    };

    $scope.changePasswordFunction = function(user) {
        console.log("we are going to the move up" + user.id);
        $scope.changePassword =false;

        var number;
        for (var index = 0; index < $scope.allUsers.length; index++){
            if (user.id == $scope.allUsers[index].id){
                number = index;
            }
        }
        $rootScope.$broadcast('changePasswordData', {
            user: {
                'specificUser': $scope.allUsers[number]
            }
        });
        //$rootScope.$broadcast('hi');
    };

    $scope.deleteUserFunction = function(user){

        UserFactory.deleteUser(user).then(function (response) {
            console.log('doe');
            console.log(response);
        });

        $route.reload();

    };








});
