var orchidApp = angular.module('orchidApp');
orchidApp.controller('countriesController', ['$scope', '$location', '$state', '$stateParams', function($scope, $location, $state, $stateParams) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.NAMEOFPAGE = "ALLL OF THE COUNTRIES COUNTRIESSSSSSS";

    console.log('countries controller loaded');
}]);