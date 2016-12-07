var orchidApp = angular.module('orchidApp');
orchidApp.controller('contactController', ['$scope', '$location', '$state', 'EmailFactory', function($scope, $location, $state, EmailFactory) {

    $scope.submit = function(){
            console.log($scope.contact.subject);

        var data = {
            'html': $scope.contact.message,
            'subject': $scope.contact.subject,
            'from_email': $scope.contact.from_email,
            'from_name': $scope.contact.from_name
        }
        console.log(data);

        //MAKING THE REQUEST TO THE EMAIL SERVER

    }



    //console.log('contact controller');
}]);
