var orchidApp = angular.module('orchidApp');
orchidApp.controller('specificCountryController', ['$scope', '$location', '$state', '$stateParams', function($scope, $location, $state, $stateParams) {
    $scope.NAMEOFPAGE = $stateParams.country;


    console.log('specific countries controller loaded');
}]);