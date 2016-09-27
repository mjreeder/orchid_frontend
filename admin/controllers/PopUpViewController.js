app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope){

    $scope.plant = {};

    $scope.$on('current-plant', function(event, data){
      console.log(data);
      $scope.plant = data;
    })

    $scope.today = new Date();

    $scope.submitPopUp = function(){
        console.log("HELLO");
        $location.path('#/search');
    }

    $scope.closePopUp = function(){
      $rootScope.$broadcast('popup-close', true);
    }

});
