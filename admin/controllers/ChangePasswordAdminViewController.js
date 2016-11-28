app.controller('ChangePasswordAdminViewController', function($scope, $route, $rootScope, $routeParams, UserFactory, $location, $window){


   $scope.$on('changePasswordData', function(event, data){
       $scope.user = data;
       $scope.specificUser = $scope.user.user.specificUser;

   });

    $scope.closePopUp = function(){
        $rootScope.$broadcast('changePassword', true);
    };
    $scope.changePasswordFunction = function(){

       if($scope.creds.password === undefined || $scope.creds.password == ""){
           $window.alert('Please enter a password.');
       }else {
           var info = {
               'newPassword': $scope.creds.password,
               'id': $scope.specificUser.id,
               'email' : $scope.specificUser.email
           };
           UserFactory.changePassword(info).then(function (response) {

           });

           $scope.closePopUp();
           $route.reload();
       }
   }




});
