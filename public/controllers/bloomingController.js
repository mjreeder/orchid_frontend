orchidApp.controller('bloomingController', function($scope, $location, $state, $stateParams, PlantsFactory) {


    $scope.NAMEOFPAGE = "BLOOOOOOOOMMMMMMIIIINNNGGGG";

    PlantsFactory.getCurrentBlooming().then(function (response){
        console.log(response);
    });


});