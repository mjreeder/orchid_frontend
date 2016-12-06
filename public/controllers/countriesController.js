var orchidApp = angular.module('orchidApp');
orchidApp.controller('countriesController', ['$scope', '$location', '$state', '$stateParams', 'countryFactory', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, countryFactory, PlantsFactory, PhotoFactory) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.NAMEOFPAGE = "Countries";
    $scope.collectionOfItems = [];
    $scope.plantsOfCountry = [];


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

        console.log(success[0]);

        for(var i = 0; i < success[0].length; i++){
            $scope.collectionOfItems.push(success[0][i]);
        }

        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            console.log($scope.collectionOfItems[i]);
            $scope.collectionOfItems[i].hasPicture = false;
        }

        $scope.loadPictures();


    }, function (error) {

    });

    $scope.loadPictures = function(){

        for(var i = 0 ; i < $scope.collectionOfItems.length; i++){
            console.log($scope.collectionOfItems[i]);

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
                            $scope.collectionOfItems[t].picture = data[0].url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

            for(var i = 0; i < $scope.collectionOfItems.length; i++){
                console.log($scope.collectionOfItems[i].picture);
            }

            $scope.$apply();

        }, function (error) {

        });
    }







}]);