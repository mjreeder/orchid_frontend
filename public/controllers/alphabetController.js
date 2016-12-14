var orchidApp = angular.module('orchidApp');
orchidApp.controller('alphabetController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {
    $scope.NAMEOFPAGE = "Alphabetical";
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    $scope.tabs = {};
    $scope.letter = $stateParams.letter;
    if($scope.letter == undefined){
        $location.path('/alphabet/A');
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
        $location.path('/alphabet/A');
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


    var promArray1 = [];

    var prom1 = new Promise(function(resolve, reject) {
        PlantsFactory.topFiveCollection().then(function (response){
            resolve(response.data.data);
        })
    });

    promArray1.push(prom1);

    var prom2 = new Promise(function(resolve, reject) {
        PlantsFactory.topFiveSubtribes().then(function (response){
            resolve(response.data.data);
        })
    });
    promArray1.push(prom2);

    Promise.all(promArray1).then(function (success) {


        var specialCollectionsData = success[0];
        var speciesCollectionsData = success[1];

        var i = 0;

        for(i = 0; i < specialCollectionsData.length; i++){
            $scope.dynamicSidebarContent.specialCollections.push(specialCollectionsData[i]);
        }
        i = 0;
        var lengthOfSpecies = 0;
        if (speciesCollectionsData.length > 5){
            lengthOfSpecies = 6;
        } else {
            lengthOfSpecies = speciesCollectionsData.length;
        }
        for(i = 0; i < lengthOfSpecies; i++){
            if(speciesCollectionsData[i].tribe_name == ""){

            } else {
                var name = speciesCollectionsData[i].tribe_name;
                speciesCollectionsData[i].name = name;
                $scope.dynamicSidebarContent.subtribes.push(speciesCollectionsData[i]);

            }
        }

        $scope.$apply();

    }, function (error) {

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

}]);