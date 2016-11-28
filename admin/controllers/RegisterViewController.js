app.controller('RegisterViewController', function($scope, $rootScope, UserFactory, $route){

    $scope.newUser = false;

    $scope.editUsers = false;

    $scope.changeUser = [];

    $scope.startEditingUser = function(){
        if($scope.editUsers == false){
            $scope.editUsers = true;
        } else {
            $scope.editUsers = false;
            //TODO SAVE THE INFORMATION THAT IS CHANGED

            checkUserModelInformation();


            for(var i = 0; i < $scope.updateUsers.length; i++){
                var user = $scope.updateUsers[i];
                UserFactory.updateUser(user).then(function (response){

                });
            }
        }
    };

    $scope.updateUsers = [];

    function checkUserModelInformation(){

        for(var i = 0; i < $scope.allUsers.length; i++){
            for(var j = 0; j < $scope.oringialUsers.length; j++){


                if($scope.allUsers[i].id == $scope.oringialUsers[j].id){
                    //WE HAVE MATCHED THE NEW EMPLOYESS AND THE ORGINIAL
                    var newUser = $scope.allUsers[i];
                    var oldUser = $scope.oringialUsers[j];


                    if(oldUser.first_name == newUser.first_name){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                    if(oldUser.last_name == newUser.last_name){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                    if(oldUser.auth_level == newUser.auth_level){
                        //Do NOTHING
                    } else {
                        $scope.updateUsers.push(newUser);
                        break;
                    }

                }
            }
        }

    }


    $scope.allUsers = [];

    $scope.oringialUsers = [];

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


    UserFactory.getAllUsers().then(function (response){
        var data = response.data.data;

        for (var i = 0; i < data.length; i++){
            var singleUser = data[i];
            if(singleUser.auth_level == 1){
                singleUser.isAuthUser = true;
            } else {
                singleUser.isAthUser = false;
            }
            $scope.oringialUsers.push(singleUser);

        }
    });

    $scope.changePassword = true;
    $scope.deleteUser = true;

    $scope.deleteUserPopUp = function(user){
        $scope.deleteUser = false;

        var number;
        for (var index = 0; index < $scope.allUsers.length; index++){

            if (user.id == $scope.allUsers[index].id){
                number = index;
            }
        }
        $rootScope.$broadcast('deleteUserData', {
            user: {
                'specificUser': $scope.allUsers[number]
            }
        });
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
        $scope.changePassword = false;

    };

    $scope.changePasswordFunction = function(user) {
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
    };

    $scope.deleteUserFunction = function(user){


        $route.reload();

    };

    $scope.addUser = function(){
        $scope.newUser = true;

    };

    $scope.saveUser = function(user){

    };

    var userAdded = false;

    $scope.changeAuthLevel = function(user){
        //CHANGING THE AUTH LEVEL OF THAT USER
       if(user.auth_level == 1){
           user.auth_level = 2;
       } else {
           user.auth_level = 1;
       }

        //SEEING WHO IT IS

        //ADD THIS USER TO A ARRAY FOR NEW SUBMISSION

        for(var i = 0; i < $scope.changeUser.length; i++){
            if (user.id == $scope.changeUser[i].id){
                $scope.changeUser.splice(i, 1);
                $scope.changeUser.push(user);
                userAdded = true;

                break;
            } else {

            }

        }

        if(userAdded == false){
            $scope.changeUser.push(user);
        }

    }
});
