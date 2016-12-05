var orchidApp = angular.module('orchidApp');
orchidApp.controller('countriesController', ['$scope', '$location', '$state', '$stateParams', 'countryFactory', 'PlantsFactory', function($scope, $location, $state, $stateParams, countryFactory, PlantsFactory) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.NAMEOFPAGE = "Countries";
    $scope.collectionOfItems = [];


    countryFactory.getCurrentCountires().then(function (response){
      $scope.collectionOfItems = response.data.data;
    });


    $scope.moveTo = function(item){
        $location.path('/country/' + item.name);
    }





}]);