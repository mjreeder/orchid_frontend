orchidApp.controller('bloomingController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {

    $scope.collectionOfItems = [];

    PlantsFactory.getCurrentBlooming().then(function (response){
        var returnObject = response.data.data;

        var photos = returnObject.photo;
        var plants = returnObject.plants;



        for(var i = 0; i < plants.length; i++){

            $scope.collectionOfItems[i] = plants[i];
            $scope.collectionOfItems[i].hasPicture = false;
            var plant_id = plants[i].id;

            //setting the display name to the scientific name
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].scientific_name;

            for(var index = 0; index < photos.length; index++){
                if(plant_id == photos[index].plant_id){
                    $scope.collectionOfItems[i].hasPicture = true;
                    $scope.collectionOfItems[i].picture =  photos[index].thumb_url;
                    break;
                }
            }
        }

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

        }, function (error) {
        $error.handle(error);
    });

  
    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    };


});