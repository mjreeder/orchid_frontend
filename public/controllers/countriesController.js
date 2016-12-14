var orchidApp = angular.module('orchidApp');
orchidApp.controller('countriesController', ['$scope', '$location', '$state', '$stateParams', 'countryFactory', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, countryFactory, PlantsFactory, PhotoFactory) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.NAMEOFPAGE = "Countries";
    $scope.collectionOfItems = [];
    $scope.plantsOfCountry = [];
    $scope.dynamicSidebarContent = {
        specialCollections : ["Special Test 1", "Special Test 2"],
        subtribes: ["Subtribe Test 1", "Subtribe Test 2"]
    };

    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

    var init = function() {
        $scope.dynamicSidebarContent.specialCollections;
        $scope.dynamicSidebarContent.subtribes;
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
    $scope.moveTo = function(item){
        $location.path('/country/' + item.name);
    };

    var promArray = [];
    var pictureArray = [];
    var syncArray = [];



    var prom = new Promise(function(resolve, reject) {
        countryFactory.getCurrentCountires().then(function (response){
            resolve(response.data.data);
        });
    });

    promArray.push(prom);

    Promise.all(promArray).then(function (success) {


        for(var i = 0; i < success[0].length; i++){
            $scope.collectionOfItems.push(success[0][i]);
        }

        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;
        }

        $scope.loadPictures();


    }, function (error) {

    });

    $scope.loadPictures = function(){

        for(var i = 0 ; i < $scope.collectionOfItems.length; i++){

            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.oneCountryPhoto($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response.data.data);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].id);
        }

        Promise.all(pictureArray).then(function (success) {

            for(var i = 0; i < success.length; i++){
                var countryID = syncArray[i];
                var data = success[i];
                if(data.length == 0){
                    } else {
                    for(var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if($scope.collectionOfItems[t].id == countryID){
                            $scope.collectionOfItems[t].picture = data[0].thumb_url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

            $scope.$apply();

        }, function (error) {

        });
    }

    init();
}]);