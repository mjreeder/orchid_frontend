orchidApp.controller('countriesController', function($scope, $state, $stateParams, countryFactory, PlantsFactory, PhotoFactory, $error) {

    $scope.collectionOfItems = [];
    $scope.plantsOfCountry = [];
    $scope.dynamicSidebarContent = {
        specialCollections : ["Special Test 1", "Special Test 2"],
        subtribes: ["Subtribe Test 1", "Subtribe Test 2"]
    };

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

//        $scope.loadPictures();

    }, function (error) {
        $error.handle(error);
    });
  
    $scope.moveTo = function(item){
        $state.go('specificCountry', {country: item.name});
    };
    
    var pictureArray = [];
    var syncArray = [];

    countryFactory.getCurrentCountires().then(function (response){
          var countires = response.data.data.countries;
        var photos = response.data.data.photos;

          for(var i = 0; i < countires.length; i++){
            $scope.collectionOfItems.push(countires[i]);
        }

        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].name;
            $scope.collectionOfItems[i].hasPicture = false;
        }

        for(var i = 0; i < photos.length; i++){
            var photo_plant_id = photos[i].country_id;

            for(var j = 0; j < $scope.collectionOfItems.length; j++){
                if(photo_plant_id == $scope.collectionOfItems[j].id){
                    $scope.collectionOfItems[j].hasPicture = true;
                    $scope.collectionOfItems[j].picture = photos[i].picture;
                    //console.log(photos[i].picture);
                }
            }
        }


    }, function(error){
      $error.handle(error);
    });

    init();
});