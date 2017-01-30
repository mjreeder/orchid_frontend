orchidApp.controller('HomePageController', function($scope, $location, $state, EmailFactory, PlantsFactory) {

    PlantsFactory.getCount().then(function (response){
       $scope.count = response.data.data['COUNT(*)'];
    }, function (response){

    });

});
