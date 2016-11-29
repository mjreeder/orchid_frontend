var orchidApp = angular.module('orchidApp');
orchidApp.controller('alphabetController', ['$scope', '$location', '$state', '$stateParams', function($scope, $location, $state, $stateParams) {
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    $scope.tabs = {};
    $scope.letter = $stateParams.letter;
    $scope.expanded = null;

    var initTabs = function() {
        var tabs = document.getElementById('tabs').children;
        for(var i=0; i<tabs.length; i++) {
            var tab = tabs[i];
            var key = tab.dataset.startLetter;
            $scope.tabs[key] = { parent: tab };
            tab.dataset.expanded = false;
        }
    };

    initTabs();

    $scope.toggleExpanded = function(event) {
        var tab = event.target.parentElement;
        if(tab == $scope.expanded) {
            unexpand(tab);
        } else {
            expand(tab);
        }
    };

    var unexpand = function(tab) {
        if(!$scope.expanded) return;

        $scope.expanded = null;
        var previewContainer = tab.children[0];
        var lettersContainer = tab.children[1];
        previewContainer.style.display = 'inherit';
        lettersContainer.style.display = 'none';
        tab.classList.toggle('active');
    };

    var expand = function(tab) {
        lazyLoadLetters(tab);
        unexpand($scope.expanded);
        $scope.expanded = tab;
        var previewContainer = tab.children[0];
        var lettersContainer = tab.children[1];
        previewContainer.style.display = 'none';
        lettersContainer.style.display = 'inherit';
        tab.classList.toggle('active');
    };

    var lazyLoadLetters = function(tab) {
        var startLetter = tab.dataset.startLetter;
        var endLetter = tab.dataset.endLetter;
        var letters = $scope.tabs[startLetter].letters;
        if(!letters) {
            letters = createLetters(tab, startLetter, endLetter);
            $scope.tabs[startLetter].letters = letters;
        }
    };

    var createLetters = function(tab, startLetter, endLetter) {
        console.log("creating letters " + startLetter + " through " + endLetter);
        var startIndex = alphabet.indexOf(startLetter);
        var endIndex = alphabet.indexOf(endLetter);
        var lettersContainer = tab.children[1];
        for(var i = startIndex; i < endIndex+1; i++) {
            var newLetterElement = createLetterElement(alphabet[i]);
            lettersContainer.appendChild(newLetterElement);
        }
        return lettersContainer;
    };

    var createLetterElement = function(letter) {
        var letterElement = document.createElement('span');
        var letterText = document.createTextNode(letter);
        letterElement.className = 'letter';
        letterElement.appendChild(letterText);
        letterElement.addEventListener("click", function() {
            onLetterClick(letter)
        });
        return letterElement;
    };

    var onLetterClick = function(letter) {
        console.log('clicked ' + letter);
        $state.go('alphabetical.search', {letter: letter});
    };

    console.log($scope.letter);
    console.log('alphabet controller loaded');
}]);