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

        $scope.loadPictures();

    }, function (error) {
        $error.handle(error);
    });
  
    $scope.moveTo = function(item){
        $state.go('specificCountry', {country: item.name});
    };

    
    var pictureArray = [];
    var syncArray = [];

    countryFactory.getCurrentCountires().then(function (response){
          var success = response.data.data  
          
          for(var i = 0; i < success[0].length; i++){
            $scope.collectionOfItems.push(success[0][i]);
        }

        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;
        }

        $scope.loadPictures();
    }, function(error){
      $error.handle(error);
    });

    $scope.loadPictures = function(){

        for(var i = 0 ; i < $scope.collectionOfItems.length; i++){

            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.oneCountryPhoto($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response.data.data);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].id);
        }

        Promise.all(pictureArray).then(function (success) {

            for(var i = 0; i < success.length; i++){
                var countryID = syncArray[i];
                var data = success[i];
                if(data.length == 0){
                    } else {
                    for(var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if($scope.collectionOfItems[t].id == countryID){
                            $scope.collectionOfItems[t].picture = data[0].thumb_url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

//            $scope.$apply();

        }, function (error) {
            $error.handle(error);
        });
    }

    init();
});