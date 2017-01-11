orchidApp.controller('contactController', function($scope, $location, $state, EmailFactory) {

    $scope.submit = function(){
            console.log($scope.contact.subject);
        var data = {
            'html': $scope.contact.message,
            'subject': $scope.contact.subject,
            'from_email': $scope.contact.from_email,
            'from_name': $scope.contact.from_name
        }

    }
});
