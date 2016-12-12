var orchidApp = angular.module('orchidApp');
orchidApp.controller('specificCountryController', ['$scope', '$location', '$state', '$stateParams', 'countryFactory', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, countryFactory, PlantsFactory, PhotoFactory) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.currentCountries = [];
    $scope.collectionOfItems = [];


    var promArray = [];

    var prom = new Promise(function(resolve, reject) {
        countryFactory.getCurrentCountires().then(function (response){
            resolve(response);
        });
    });
    promArray.push(prom);

    Promise.all(promArray).then(function (success) {

        $scope.currentCountries = success[0].data.data;

        console.log()
        for(var i = 0; i < $scope.currentCountries.length; i++){
            if($scope.NAMEOFPAGE == $scope.currentCountries[i].name){
               $scope.countineLoading();
            } else {

            }
        }


    }, function (error) {

    });

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

        $scope.continueLoad();
        $scope.$apply();

    }, function (error) {

    });


    $scope.countineLoading = function(){
        var countryArray = [];

        var prom = new Promise(function(resolve, reject) {
            PlantsFactory.getCountries($scope.NAMEOFPAGE).then(function(response){
                resolve(response);
            });
        });

        countryArray.push(prom);

        Promise.all(countryArray).then(function (success) {

            var newData = success[0].data.data;

            for(var i = 0; i < newData.length; i++){
                $scope.collectionOfItems.push(newData[i]);
            }

            $scope.$apply();
            $scope.continueLoading();

        }, function (error) {

        });



    };

    $scope.continueLoading = function(){
        var photoArray = [];
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;


            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response);
                })
            });

            photoArray.push(prom);
        }
        $scope.$apply();


        Promise.all(photoArray).then(function (success) {

            var cleanList = [];

            for(var i = 0; i < success.length; i++){
                for (var j = 0; j < success[i].data.data.length; j++){
                    cleanList.push(success[i].data.data[j]);
                }
            }

            for(var t = 0; t < cleanList.length; t++){
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    if (cleanList[t].plant_id == $scope.collectionOfItems[i].id && cleanList[t].type == 'profile'){
                        $scope.collectionOfItems[i].picture = cleanList[t].url;
                        $scope.collectionOfItems[i].hasPicture = true;
                        break;
                    }
                }
            }
            $scope.$apply();

        }, function (error) {
            $state.go("404")
        });

    }

    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    }
}]);