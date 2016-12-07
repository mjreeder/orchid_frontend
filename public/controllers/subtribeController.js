var orchidApp = angular.module('orchidApp');
orchidApp.controller('subtribeController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.NAMEOFPAGE = "Sub Tribes";

    $scope.collectionOfItems = [];

    //$scope.collectionOfItems.push({name:"tribe1"});
    //$scope.collectionOfItems.push({name:"tribe2"});
    //$scope.collectionOfItems.push({name:"tribe3"});
    //$scope.collectionOfItems.push({name:"tribe4"});
    //$scope.collectionOfItems.push({name:"tribe5"});
    //$scope.collectionOfItems.push({name:"tribe6"});


    $scope.moveTo = function(item){
        $location.path('/sub_tribe/' + item.name);
    };

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

        console.log(success);

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

        for(i = 0; i < speciesCollectionsData.length; i++){
            if(speciesCollectionsData[i].tribe_name == ""){

            } else {
                var name = speciesCollectionsData[i].tribe_name;
                speciesCollectionsData[i].name = name;
                $scope.collectionOfItems.push(speciesCollectionsData[i]);
            }
        }

        for(i = 0; i < $scope.dynamicSidebarContent.subtribes.length; i++){
            console.log($scope.dynamicSidebarContent.subtribes[i]);
        }
        $scope.continueLoad();
        $scope.$apply();

    }, function (error) {

    });

    var pictureArray = [];
    var syncArray = [];

    $scope.continueLoad = function() {

        for (var i = 0; i < $scope.collectionOfItems.length; i++) {
            console.log($scope.collectionOfItems[i].tribe_name);

            var prom = new Promise(function (resolve, reject) {
                PhotoFactory.onePhotoTribe($scope.collectionOfItems[i].tribe_name).then(function (response) {
                    resolve(response.data.data);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].tribe_name);
        }


        Promise.all(pictureArray).then(function (success) {

            console.log(success);
            for (var i = 0; i < $scope.collectionOfItems.length; i++) {
                $scope.collectionOfItems[i].hasPicture = false;
            }

            for (var i = 0; i < success.length; i++) {
                var countryID = syncArray[i];
                var data = success[i];
                if (data.length == 0) {
                } else {
                    for (var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if ($scope.collectionOfItems[t].name == countryID) {
                            $scope.collectionOfItems[t].picture = data[0].url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

            $scope.$apply();

        }, function (error) {

        });
    }



}]);