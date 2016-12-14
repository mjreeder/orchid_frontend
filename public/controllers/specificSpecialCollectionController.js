var orchidApp = angular.module('orchidApp');
orchidApp.controller('specificSpecialCollectionsController', ['$scope', '$location', '$state', '$stateParams', 'SpeicalCollectionsFactory', 'PhotoFactory', 'PlantsFactory', function($scope, $location, $state, $stateParams, SpeicalCollectionsFactory, PhotoFactory, PlantsFactory) {

    var collectionNumber =  $stateParams.collection;

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
            $state.go("404")

        } else {
            $scope.idForSpeicalCollection = success[0].data.data.id;

            $scope.NAMEOFPAGE = success[0].data.data.name;

            $scope.$apply();


            $scope.continueLoading();
        }


    }, function (error) {

        $state.go("404")
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
        $scope.continueLoading();

        $scope.$apply();

    }, function (error) {

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
            var data = success[0].data.data;

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

            var cleanList = [];

            for(var i = 0; i < success.length; i++){
                for (var j = 0; j < success[i].data.data.length; j++){
                        cleanList.push(success[i].data.data[j])
                }
            }

            for(var t = 0; t < cleanList.length; t++){
               for(var i = 0; i < $scope.collectionOfItems.length; i++){
                   if (cleanList[t].plant_id == $scope.collectionOfItems[i].id){
                       $scope.collectionOfItems[i].picture = cleanList[t].thumb_url;
                       console.log(cleanList[t].thumb_url);
                       $scope.collectionOfItems[i].hasPicture = true;
                       break;
                   }
               }
            }

            for(var i = 0; $scope.collectionOfItems.length; i++)
            {
                if($scope.collectionOfItems[i].name == ""){
                    $scope.collectionOfItems[i].name = "<NO COMMON NAME>";
                }
                $scope.$apply();

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

    }


}]);