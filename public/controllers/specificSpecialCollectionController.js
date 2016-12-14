orchidApp.controller('specificSpecialCollectionsController', function($scope, $state, $stateParams, SpeicalCollectionsFactory, PhotoFactory, PlantsFactory, $error) {

    var collectionNumber =  $stateParams.collection;

    $scope.collectionOfItems = [];

   
    SpeicalCollectionsFactory.getBySpecificID(collectionNumber)
      .then(function (response){
        if(response.data.data.length == 0){
            $state.go("404")

        } else {
            $scope.idForSpeicalCollection = response.data.data.id;

            $state.current.data.pageTitle = response.data.data.name;
//            $scope.$apply();
            $scope.continueLoading();
        }
    }, function(error) {
      $error.handle(error, false, true);
    });

    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

    var init = function() {
        $scope.dynamicSidebarContent.specialCollections; //= factory call to pull in collections; TODO
        $scope.dynamicSidebarContent.subtribes; //= factory call to pull in subtribes; TODO
    };

    PlantsFactory.topFiveCollectionsAndSubtribes()
      .then(function (success) {
        $scope.dynamicSidebarContent.specialCollections = success.collections;
        $scope.dynamicSidebarContent.subtribes = success.subtribes;

        $scope.continueLoading();

    }, function (error) {
        $error.handle(error);
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
                   if (cleanList[t].plant_id == $scope.collectionOfItems[i].id && cleanList[t].type == 'profile'){
                       $scope.collectionOfItems[i].picture = cleanList[t].url;
                       $scope.collectionOfItems[i].hasPicture = true;
                       break;
                   }
               }
            }

            for(var i = 0; i < $scope.collectionOfItems.length; i++)
            {
                if(!$scope.collectionOfItems[i].name){
                    $scope.collectionOfItems[i].name = "<NO COMMON NAME>";
                }
            }
            $scope.$apply();

        }, function (error) {

            $state.go("404")
        });

    }

    $scope.moveTo = function(item){

        $state.go('specificPlant', {accession_number: item.accession_number});

    }

//    $scope.locationPath = function(id){
//
//    }


});