var orchidApp = angular.module('orchidApp');
orchidApp.controller('letterSearchController', ['$scope', '$location', '$state', '$stateParams', function($scope, $location, $state, $stateParams) {
    $scope.letter = $stateParams.letter;
}]);
