var orchidApp = angular.module('orchidApp');
orchidApp.controller('subtribeController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.NAMEOFPAGE = "Sub Tribes";

    $scope.collectionOfItems = [];

    $scope.collectionOfItems.push({name:"tribe1"});
    $scope.collectionOfItems.push({name:"tribe2"});
    $scope.collectionOfItems.push({name:"tribe3"});
    $scope.collectionOfItems.push({name:"tribe4"});
    $scope.collectionOfItems.push({name:"tribe5"});
    $scope.collectionOfItems.push({name:"tribe6"});


    $scope.moveTo = function(item){
        $location.path('/sub_tribe/' + item.name);
    };

    var pictureArray = [];
    var syncArray = [];


        for(var i = 0 ; i < $scope.collectionOfItems.length; i++){
            console.log($scope.collectionOfItems[i].name);

            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.onePhotoTribe($scope.collectionOfItems[i].name).then(function (response){
                    resolve(response.data.data);
                });
            });

            pictureArray.push(prom);
            syncArray.push($scope.collectionOfItems[i].name);
        }


        Promise.all(pictureArray).then(function (success) {

            console.log(success);
            for(var  i = 0; i < $scope.collectionOfItems.length; i++) {
                $scope.collectionOfItems[i].hasPicture = false;
            }

                for(var i = 0; i < success.length; i++){
                var countryID = syncArray[i];
                var data = success[i];
                if(data.length == 0){
                } else {
                    for(var t = 0; t < $scope.collectionOfItems.length; t++) {
                        if($scope.collectionOfItems[t].name == countryID){
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



}]);