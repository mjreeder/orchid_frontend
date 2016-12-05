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
            console.log($scope.currentCountries[i].name);
            if($scope.NAMEOFPAGE == $scope.currentCountries[i].name){
               $scope.countineLoading();
            } else {

            }
        }


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

           //console.log(success[0].data.data);
            var newData = success[0].data.data;
            console.log(newData);

            for(var i = 0; i < newData.length; i++){
                $scope.collectionOfItems.push(newData[i]);
            }

            for(var i = 0; i < $scope.collectionOfItems.length; i++){
               console.log($scope.collectionOfItems[i]);
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
            console.log("this is the photo");
            //console.log(success);

            var cleanList = [];
            //console.log(success[1].data.data);

            for(var i = 0; i < success.length; i++){

                console.log(success[i].data.data.length);

                for (var j = 0; j < success[i].data.data.length; j++){
                    console.log(success[i].data.data[j]);
                    cleanList.push(success[i].data.data[j])


                }

            }

            console.log(cleanList);

            for(var t = 0; t < cleanList.length; t++){
                console.log(cleanList[t].plant_id);
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    //$scope.collectionOfItems[i].hasPicture = false;
                    console.log(cleanList[t].url);
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