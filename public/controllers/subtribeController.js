var orchidApp = angular.module('orchidApp');
orchidApp.controller('subtribeController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.NAMEOFPAGE = "Sub Tribes";

    $scope.collectionOfItems = [];

    $scope.collectionOfItems.push({name:"tribe1"});
    $scope.collectionOfItems.push({name:"tribe2"});
    $scope.collectionOfItems.push({name:"tribe3"});
    $scope.collectionOfItems.push({name:"tribe4"});
    $scope.collectionOfItems.push({name:"tribe5"});
    $scope.collectionOfItems.push({name:"tribe6"});

    PlantsFactory.getSubTribes().then(function (response){
        console.log(response);
    });



    $scope.moveTo = function(item){
        $location.path('/sub_tribe/' + item.name);
    }

}]);