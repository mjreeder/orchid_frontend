orchidApp.controller('specialCollectionsController', function($scope, $state, $stateParams, SpeicalCollectionsFactory, PhotoFactory, PlantsFactory, $error) {

    $scope.collectionOfItems = [];
    $scope.genericPicture = true;
    $scope.dynamicSidebarContent = {
        specialCollections : [],
        subtribes: []
    };

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

    }, function (error) {
        $error.handle(error);
    });

    $scope.idForSpeicalCollection = 0;
    var promArray = [];

    var promArray2 = [];

    $scope.moveTo = function(name){

        var prom2 = new Promise(function(resolve, reject) {
            SpeicalCollectionsFactory.getBySpecificID(name.id).then(function(response){
                resolve(response);
            });
        });

        promArray2.push(prom2);

        Promise.all(promArray2).then(function (success) {

            $scope.idForSpeicalCollection = success[0].data.data.id;
            $scope.locationPath($scope.idForSpeicalCollection);


        }, function (error) {

        });
    }

    $scope.locationPath = function(id){
        if(id == undefined){
            $state.go("404")
        } else {
            $state.go("specificCollection", {collection: id})
        }
    }

    var prom = new Promise(function(resolve, reject) {
        SpeicalCollectionsFactory.getSpeicalCollections().then(function(response){
            resolve(response);
        });
    });

    promArray.push(prom);

    Promise.all(promArray)
      .then(function (success) {

        for (var i = 0; i < success.length; i++){
            $scope.collectionOfItems = success[0].data.data;
        }
        
        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].name;
            $scope.collectionOfItems[i].hasPicture = false;
        }

        $scope.$apply();

      }, function (error) {

    });


    var pictureArray = [];
    var syncArray = [];

    $scope.goToSpecificCollection = function(id) {
        $state.go('specificCollection', {id: id});
    };

    init();
});