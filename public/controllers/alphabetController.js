var orchidApp = angular.module('orchidApp');
orchidApp.controller('alphabetController', ['$scope', '$location', '$state', '$stateParams', function($scope, $location, $state, $stateParams) {
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    $scope.letter = $stateParams.letter;
    $scope.expanded = '';

    $scope.NAMEOFPAGE = "ALPHA";

    $scope.expand = function(event, startLetter, endLetter) {
        console.log('expand');
        var element = event.target;
        var letters = document.createElement('span');
        $scope.expanded = startLetter;
        var startIndex = alphabet.indexOf(startLetter);
        var endIndex = alphabet.indexOf(endLetter);
        for(var i = startIndex; i < endIndex+1; i++) {
            var newLetterElement = createLetterElement(alphabet[i]);
            letters.appendChild(newLetterElement);
        }
        var parent = element.parentElement;
        parent.children[1].appendChild(letters);
        parent.classList.toggle('active');
    };

    var createLetterElement = function(letter) {
        var letterElement = document.createElement('span');
        var letter = document.createTextNode(letter);
        letterElement.className = 'letter';
        letterElement.appendChild(letter);
        return letterElement;
    };

    console.log($scope.letter);
    console.log('alphabet controller loaded');
}]);