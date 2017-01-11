orchidApp.controller('specificSubTribeController', function($scope, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {

    $state.current.data.pageTitle = $stateParams.tribe;

    $scope.allItems = [];

    $scope.moveTo = function(item){
        $state.go('specificPlant', {accession_number: item.accession_number});
    };

    var array = [];

    var prom = new Promise(function(resolve, reject) {
        PlantsFactory.getPlantsFromSubTribe($state.current.data.pageTitle).then(function(response){
            resolve(response);
        }, function(error){
          reject(error);
        });

    });
    $scope.collectionOfItems = [];

    array.push(prom);

    Promise.all(array).then(function (success) {
        var newData = success[0].data.data;

        if(newData[0] == false){
            $state.go("404")
        }

        for(var i = 0; i < newData.length; i++){
            $scope.collectionOfItems.push(newData[i]);
        }

        $scope.$apply();

    }, function (error) {

    });

    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

    var init = function() {
        $scope.dynamicSidebarContent.specialCollections;
        $scope.dynamicSidebarContent.subtribes;
    };


    PlantsFactory.topFiveCollectionsAndSubtribes()
      .then(function (success) {
        $scope.dynamicSidebarContent.specialCollections = success.collections;
        $scope.dynamicSidebarContent.subtribes = success.subtribes;

        $scope.continueLoad();

    }, function (error) {
        $error.handle(error);
    });

    $scope.continueLoad = function(){
        var photoArray = [];
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].scientific_name;


            if($scope.collectionOfItems[i].id == undefined){

            } else {
                var prom = new Promise(function(resolve, reject) {
                    PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                        resolve(response);
                    }, function(error){
                      reject(error);
                    });
                });

                photoArray.push(prom);
            }
        }

        Promise.all(photoArray).then(function (success) {
            var cleanList = [];

            for(var i = 0; i < success.length; i++){
                for (var j = 0; j < success[i].data.data.length; j++){
                    cleanList.push(success[i].data.data[j])
                }
                if(success[i].data.data.length == undefined){

                }else {
                }
            }


            for(var t = 0; t < cleanList.length; t++){
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    $scope.collectionOfItems[i].hasPicture = false;

                    if (cleanList[t].plant_id == $scope.collectionOfItems[i].id){
                        $scope.collectionOfItems[i].picture = cleanList[t].thumb_url;
                        $scope.collectionOfItems[i].hasPicture = true;
                        break;
                    }
                }
            }

            for(var i = 0; i < $scope.collectionOfItems.length; i++)
            {
                if(!$scope.collectionOfItems[i].name){
//                    console.log("wwe have hit");
                    $scope.collectionOfItems[i].name = "<NO COMMON NAME>";
                }
//                $scope.$apply();

            }

//            $scope.$apply();



        }, function (error) {
            $error.handle(error, false, true);
        });

    }

});