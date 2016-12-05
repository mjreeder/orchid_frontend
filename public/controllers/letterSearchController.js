var orchidApp = angular.module('orchidApp');
orchidApp.controller('letterSearchController', ['$scope','$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $stateParams, PlantsFactory, PhotoFactory, countryFactory) {
    $scope.letter = $stateParams.letter;
    $scope.loading = true;
    $scope.plants = [];
    $scope.picture = [];



    var PromArray = [];
    var picturePromArray = [];



    var prom = new Promise(function (resolve, reject){
        PlantsFactory.getPaginatedPlants($scope.letter, 1, 12).success(function(response) {
            console.log("SUCCESS: ", response.data);
            $scope.plants = response.data.plants;
            resolve(response.data.plants);

            $scope.loading = false;
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

        console.log($scope.plants.length);
        for(var i = 0; i < $scope.plants.length; i++){
            //console.log($scope.plants[i].id);
            var prom = new Promise(function (resolve, reject){
                PhotoFactory.getPhotosByPlantID($scope.plants[i].id).then(function(response) {
                    //var photoResponseData = response.data.data;
                    //$scope.picture.push(photoResponseData);
                    resolve(response);
                });
            });
            picturePromArray.push(prom);
        }

        Promise.all(picturePromArray).then(function (success){
            var updateList = [];

            //console.log(success);
            for (var i = 0; i < success.length; i++){
                if (success[i].data.data != ""){
                    updateList.push(success[i].data.data);
                }
                //console.log(success[i].data.data);
            }

            for (var i = 0; i < updateList.length; i++){
                for(var j = 0; j < $scope.plants.length; j++){

                    if(updateList[i][0].plant_id == $scope.plants[j].id && updateList[i][0].type == 'profile') {
                        var plant = $scope.plants[j];
                        plant.picture = updateList[i][0].url;
                        plant.hasPicture = true;
                        $scope.plants[j] = plant;

                        break;
                    } else {

                    }
                }
            }

            for(var  i = 0; i < $scope.plants.length; i++){
                if ($scope.plants[i].hasPicture == undefined || $scope.plants[i].hasPicture == null){
                    $scope.plants[i].hasPicture = false;
                }
            }

            console.log($scope.plants);

            $scope.$apply();

        });
    };

    var abc = function(){
        //for(var i = 0; i < )
        //console.log('abc');
    }


}]);


