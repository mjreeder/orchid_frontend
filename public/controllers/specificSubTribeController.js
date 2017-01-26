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

        $scope.collectionOfItems =  success[0].data.data.plants;
        var photos = success[0].data.data.photos;

        for(var t = 0; t < $scope.collectionOfItems.length; t++){
            $scope.collectionOfItems[t].hasPicture = false;

            if($scope.collectionOfItems[t].name == ""){
                $scope.collectionOfItems[t].display_name = "[No Name]"
            } else {
                $scope.collectionOfItems[t].display_name = $scope.collectionOfItems[t].name;
            }

        }

        for(var i = 0; i < photos.length; i++){
            var photo_plant_id = photos[i].plant_id;
            for(var j = 0; j < $scope.collectionOfItems.length; j++){
                if(photo_plant_id == $scope.collectionOfItems[j].id){
                    $scope.collectionOfItems[j].picture = photos[i].thumb_url;
                    $scope.collectionOfItems[j].hasPicture = true;
                    //$scope.$apply();
                    break;
                }
            }
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

            $scope.$apply();


        }, function (error) {
        $error.handle(error);
    });
});