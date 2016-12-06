var orchidApp = angular.module('orchidApp');
orchidApp.controller('specialCollectionsController', ['$scope', '$location', '$state', '$stateParams', 'SpeicalCollectionsFactory', function($scope, $location, $state, $stateParams, SpeicalCollectionsFactory) {


    $scope.NAMEOFPAGE = "Special Collections";

    $scope.collectionOfItems = [];
    $scope.genericPicture = true;

    $scope.idForSpeicalCollection = 0;
    var promArray = [];

    var promArray2 = [];

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

    }, function (error) {

    });

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





}]);