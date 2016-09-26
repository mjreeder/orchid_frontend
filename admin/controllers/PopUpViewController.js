app.controller('PopUpViewController', function(CONFIG, $scope, $location){


    $scope.today = new Date();

    $scope.submitPopUp = function(){
        console.log("HELLO");
        $location.path('#/search');
    }

});
