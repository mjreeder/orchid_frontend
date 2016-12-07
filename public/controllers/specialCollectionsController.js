var orchidApp = angular.module('orchidApp');
orchidApp.controller('specialCollectionsController', ['$scope', '$location', '$state', '$stateParams', 'SpeicalCollectionsFactory', 'PhotoFactory', 'PlantsFactory', function($scope, $location, $state, $stateParams, SpeicalCollectionsFactory, PhotoFactory, PlantsFactory) {


    $scope.NAMEOFPAGE = "Special Collections";

    $scope.collectionOfItems = [];
    $scope.genericPicture = true;
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
        for(i = 0; i < speciesCollectionsData.length; i++){
            if(speciesCollectionsData[i].species_name == ""){

            } else {
                $scope.dynamicSidebarContent.subtribes.push(speciesCollectionsData[i]);
            }
        }

        for(i = 0; i < $scope.dynamicSidebarContent.subtribes.length; i++){
            console.log($scope.dynamicSidebarContent.subtribes[i]);
        }
        $scope.$apply();

    }, function (error) {

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

            $scope.$apply();

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

    Promise.all(promArray).then(function (success) {
        console.log(success);

        for (var i = 0; i < success.length; i++){
            $scope.collectionOfItems = success[0].data.data;
        }

        $scope.$apply();
        $scope.loadPictures();
    }, function (error) {

    });


    var pictureArray = [];
    var syncArray = [];

    $scope.loadPictures = function(){

        for(var i = 0 ; i < $scope.collectionOfItems.length; i++){
            //console.log($scope.collectionOfItems[i].id);

            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.onePhotoCollections($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response.data.data);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].id);
        }

        Promise.all(pictureArray).then(function (success) {

            for(var i = 0; i < success.length; i++){
                var sp_id = syncArray[i];
                var data = success[i];
                if(data.length == 0){
                } else {
                    for(var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if($scope.collectionOfItems[t].id == sp_id){
                            $scope.collectionOfItems[t].picture = data[0].url;
                            $scope.collectionOfItems[t].hasPicture = true;
                        }
                    }
                }
            }

            for(var i = 0; i < $scope.collectionOfItems.length; i++){
                console.log($scope.collectionOfItems[i].picture);
            }

            $scope.$apply();

        }, function (error) {

        });
    };

    $scope.goToSpecificCollection = function(id) {
        $state.go('specificCollection', {id: id});
    };

    init();
}]);