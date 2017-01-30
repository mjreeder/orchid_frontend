orchidApp.controller('alphabetController', function($scope, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {
  
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    $scope.tabs = {};
    $scope.letter = $stateParams.letter;
    if($scope.letter == undefined){
        $state.go('alphabetical.search', {letter: 'A'});
    }
    $scope.expanded = null;

    var initTabs = function() {
        var tabs = document.getElementById('tabs').children;
        if(tabs.length != undefined) {
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                var key = tab.dataset.startLetter;
                $scope.tabs[key] = {parent: tab};
                tab.dataset.expanded = false;
            }
        }
    };

    $scope.reload = function(){
        $state.go('alphabetical.search', {letter: 'A'});
    }

    initTabs();

    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

    var init = function() {
        $scope.dynamicSidebarContent.specialCollections; //= factory call to pull in collections; TODO
        $scope.dynamicSidebarContent.subtribes; //= factory call to pull in subtribes; TODO
    };

    PlantsFactory.topFiveCollectionsAndSubtribes()
        .then(function (success) {
            $scope.dynamicSidebarContent.specialCollections = success.collections;
            $scope.dynamicSidebarContent.subtribes = success.subtribes;
            $scope.$apply();

        }, function (error) {
            $error.handle(error);
        });


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
        $state.go('alphabetical.search', {letter: letter});
    };

});