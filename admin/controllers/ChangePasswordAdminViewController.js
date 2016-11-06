app.controller('ChangePasswordAdminViewController', function($scope, $route, $rootScope, $routeParams, UserFactory, $location){


   $scope.$on('changePasswordData', function(event, data){

      $scope.user = data;

      $scope.specificUser = $scope.user.user.specificUser;

   });






   $scope.changePasswordFunction = function(){

         var info = {
            'newPassword': $scope.creds.password,
            'id': $scope.specificUser.id,
             'email' : $scope.specificUser.email
         };
       console.log(info);
         UserFactory.changePassword(info).then(function (response) {

         });

      $route.reload();
   }



});
