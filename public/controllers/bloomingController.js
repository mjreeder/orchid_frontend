orchidApp.controller('bloomingController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {

    $scope.collectionOfItems = [];

    PlantsFactory.getCurrentBlooming()
      .then(function (response){
        $scope.collectionOfItems = response.data.data;
        $scope.continueLoading();
      }, function(error) {
        $error.handle(error);
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

        $scope.continueLoading();

    }, function (error) {
        $error.handle(error);
    });


    $scope.continueLoading = function(){
        var photoArray = [];
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;

            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response);
                }, function(error){
                    reject(error);
                });
            });

            photoArray.push(prom);
        }

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

        }, function (error) {
            $error.handle(error, false, true);
//            $state.go("404")
        });

    };
  
    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    };


});