orchidApp.controller('bloomingController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory, $error) {

    $scope.collectionOfItems = [];


    PlantsFactory.getCurrentBlooming().then(function (response){


        var photos = response.data.data.photo;
        var plants = response.data.data.plants;


        for(var i = 0; i < plants.length; i++){
            $scope.collectionOfItems[i] = plants[i];
            $scope.collectionOfItems[i].hasPicture = false;
            var plant_id = plants[i].id;

            //setting the display name to the scientific name
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].name;
        }

        for(var j = 0; j < photos.length; j++){
            var photo_plant_id = photos[j].plant_id;
            for(var i = 0; i <  $scope.collectionOfItems.length; i++){
                if( $scope.collectionOfItems[i].id == photo_plant_id){
                    $scope.collectionOfItems[i].hasPicture = true;
                    $scope.collectionOfItems[i].picture = photos[j].thumb_url;
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
            $scope.$apply();

        }, function (error) {
        $error.handle(error);
    });

  
    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    };


});