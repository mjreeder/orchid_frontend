app.controller('RegisterViewController', function($scope, $rootScope, UserFactory){


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


});
