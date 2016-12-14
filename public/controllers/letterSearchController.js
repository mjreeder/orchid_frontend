var orchidApp = angular.module('orchidApp');
orchidApp.controller('letterSearchController', ['$scope','$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $stateParams, PlantsFactory, PhotoFactory, countryFactory) {
    $scope.letter = $stateParams.letter;
    if($scope.letter == ""){
        $state.go('alphabetical.search', {letter: letter});
    }
    $scope.loading = true;
    $scope.plants = [];
    $scope.picture = [];
    var pages = 0;



    var PromArray = [];
    var picturePromArray = [];
    var pictureSideArray = [];
    $scope.STOPLOADING = false;


    $scope.noPlantsToLoad = false;


    var prom = new Promise(function (resolve, reject){
        PlantsFactory.getPaginatedPlants($scope.letter, 1, 12).success(function(response) {
            $scope.plants = response.data.plants;

            if(undefined !== $scope.plants && $scope.plants.length){
            } else {
                $scope.noPlantsToLoad = true;
            }


            resolve(response.data.plants);
            pages = response.data.pages;


            if ($scope.plants && $scope.plants.length) {
                for (var q = 0; q < $scope.plants.length; q++) {
                    $scope.plants[q].hasPicture = false;
                    $scope.plants[q].picture = "";
                }
                $scope.loading = false;
            } else{
                $scope.STOPLOADING = true;
                $scope.loading = false;
            }

        }).error(function(response) {
            console.log("ERROR: ", response);
            $scope.loading = false;
        });
    });

    PromArray.push(prom);
    Promise.all(PromArray).then(function (success){
       xyz();
    });





    var xyz = function(){

        if($scope.STOPLOADING == false) {


            for (var i = 0; i < $scope.plants.length; i++) {
                var prom = new Promise(function (resolve, reject) {
                    PhotoFactory.getPhotosByPlantID($scope.plants[i].id).then(function (response) {
                        //var photoResponseData = response.data.data;
                        //$scope.picture.push(photoResponseData);
                        resolve(response.data.data);
                    });
                });
                picturePromArray.push(prom);
                pictureSideArray.push($scope.plants[i].id);
            }

            Promise.all(picturePromArray).then(function (success) {
                var updateList = [];
                var q = 0;
                //for(q = 0; q < $scope.plants.length; q++){
                //    $scope.plants[].hasPicture = false;
                //}
                var foundPhoto = false;


                var i = 0;
                var j = 0;
                for (i = 0; i < success.length; i++) {
                    var data = success[i];
                    foundPhoto = false;
                    if (data.length > 0) {
                        for (var t = 0; t < data.length; t++) {
                            for (var j = 0; j < $scope.plants.length; j++) {
                                if ($scope.plants[j].id == data[t].plant_id) {
                                    if ($scope.plants[j].hasPicture == false) {
                                        $scope.plants[j].picture = data[t].url;
                                        $scope.plants[j].hasPicture = true;
                                        foundPhoto = true;
                                        break;
                                    } else {
                                    }


                                } else {

                                }
                            }
                            if (foundPhoto == true) {
                                break;
                            }
                        }
                    } else {

                    }

                }


                $scope.$apply();

            });
        }
    };

    $scope.getNumberOfPages = function() {
        return new Array(pages);
    };

    $scope.getNewPage = function(pageNumber) {
        $scope.loading = true;
        PlantsFactory.getPaginatedPlants($scope.letter, pageNumber, 12).success(function(response) {
            console.log("SUCCESS: ", response);
            if(response.data.plants) {
                $scope.plants = response.data.plants;
            }
            $scope.loading = false;
        }).error(function(response) {
            console.log("ERROR:", response);
            $scope.loading = false;
        });
    };

    var abc = function(){
        //for(var i = 0; i < )
        //console.log('abc');
    }


}]);


