var orchidApp = angular.module('orchidApp');
orchidApp.controller('contactController', ['$scope', '$location', '$state', 'EmailFactory', function($scope, $location, $state, EmailFactory) {

    $scope.submit = function(){
            console.log($scope.contact.subject);
    }


    console.log('contact controller');
}]);
