orchidApp.controller('specificSubTribeController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {


    $scope.NAMEOFPAGE = $stateParams.tribe;

    $scope.tribes = [];
    $scope.tribes.push({name:"tribe1"});
    $scope.tribes.push({name:"tribe2"});
    $scope.tribes.push({name:"tribe3"});
    $scope.tribes.push({name:"tribe4"});
    $scope.tribes.push({name:"tribe5"});
    $scope.tribes.push({name:"tribe6"});


    $scope.collectionOfItems = [];

    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    }


    var array = [];

    var prom = new Promise(function(resolve, reject) {
        PlantsFactory.getPlantsFromSubTribe($scope.NAMEOFPAGE).then(function(response){
            resolve(response);
        });

    });

    array.push(prom);

    Promise.all(array).then(function (success) {
        var newData = success[0].data.data;

        for(var i = 0; i < newData.length; i++){
            $scope.collectionOfItems.push(newData[i]);
        }

        for(var i = 0; i < $scope.collectionOfItems.length; i++){
            console.log($scope.collectionOfItems[i]);
        }

        $scope.$apply();

        $scope.continueLoading();
    }, function (error) {

    });

    $scope.continueLoading = function(){
        var photoArray = [];
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;


            var prom = new Promise(function(resolve, reject) {
                PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                    resolve(response);
                })
            });

            photoArray.push(prom);
        }
        $scope.$apply();


        Promise.all(photoArray).then(function (success) {
            var cleanList = [];

            for(var i = 0; i < success.length; i++){

                console.log(success[i].data.data.length);

                for (var j = 0; j < success[i].data.data.length; j++){
                    console.log(success[i].data.data[j]);
                    cleanList.push(success[i].data.data[j])


                }

            }

            console.log(cleanList);

            for(var t = 0; t < cleanList.length; t++){
                console.log(cleanList[t].plant_id);
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    //$scope.collectionOfItems[i].hasPicture = false;
                    console.log(cleanList[t].url);
                    if (cleanList[t].plant_id == $scope.collectionOfItems[i].id && cleanList[t].type == 'profile'){
                        $scope.collectionOfItems[i].picture = cleanList[t].url;
                        $scope.collectionOfItems[i].hasPicture = true;
                        break;
                    }
                }
            }

            $scope.$apply();



        }, function (error) {

            $state.go("404")
        });

    }









}]);