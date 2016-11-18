app.controller('RegisterViewController', function($scope, $rootScope, UserFactory, $route){

    $scope.newUser = false;

    $scope.editUsers = false;

    $scope.startEditingUser = function(){
        if($scope.editUsers == false){
            $scope.editUsers = true;
        } else {
            $scope.editUsers = false;
            //TODO SAVE THE INFORMATION THAT IS CHANGED

        }

    };


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
    $scope.changePassword = true;
    $scope.deleteUser = true;

    $scope.deleteUserPopUp = function(user){
        $scope.deleteUser = false;
    };

    $scope.$on('changePassword', function(event, data) {
        if (data == true) {
            $scope.changePassword = true;
        }
    });

    $scope.$on('deleteUser2', function(event, data) {
        if (data == true) {
            $scope.deleteUser = true;
        }
    });



    $scope.changePasswordFunction = function(user){
        console.log(user);
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

    $scope.addUser = function(){
        $scope.newUser = true;

    };

    $scope.saveUser = function(user){

        console.log(user);
    }








});
