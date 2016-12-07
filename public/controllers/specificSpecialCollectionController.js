var orchidApp = angular.module('orchidApp');
orchidApp.controller('specificSpecialCollectionsController', ['$scope', '$location', '$state', '$stateParams', 'SpeicalCollectionsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, SpeicalCollectionsFactory, PhotoFactory) {

    var collectionNumber =  $stateParams.collection;
    console.log("Specific Collection: ", collectionNumber);

    $scope.collectionOfItems = [];

   var promArray = [];

    var prom = new Promise(function(resolve, reject) {
        SpeicalCollectionsFactory.getBySpecificID(collectionNumber).then(function (response){
            resolve(response);
        });
    });

    promArray.push(prom);

    Promise.all(promArray).then(function (success) {
        console.log(success);

        if(success[0].data.data.length == 0){
           console.log("404 page");

        } else {
            $scope.idForSpeicalCollection = success[0].data.data.id;

            $scope.NAMEOFPAGE = success[0].data.data.name;

            $scope.$apply();


            $scope.continueLoading();
        }


    }, function (error) {

        $state.go("404")
    });

    $scope.continueLoading = function(){
        var plantsArray = [];

        var photoArray = [];
        var prom1 = new Promise(function(resolve, reject) {
            SpeicalCollectionsFactory.getPlantsWithSpecificID($scope.idForSpeicalCollection).then(function (response) {
                //var data = response.data.data;
                resolve(response);
            });
        });
        plantsArray.push(prom1);

        Promise.all(plantsArray).then(function (success) {
            console.log("this is the plants");
            var data = success[0].data.data;
            console.log(data);
            for(var j = 0; j < data.length; j++){
                $scope.collectionOfItems[j] = data[j];

            }
            $scope.$apply();

            $scope.continueLoading2();

        }, function (error) {

            $state.go("404")
        });


    };

    $scope.continueLoading2 = function(){
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

    $scope.locationPath = function(id){
        //if(id == undefined){
        //    $state.go("404")
        //} else {
        //    $state.go("specificCollection", {collection: id})
        //}

    }


}]);