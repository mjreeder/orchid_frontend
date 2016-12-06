orchidApp.controller('bloomingController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {


    $scope.NAMEOFPAGE = "Current Blooming";
    $scope.collectionOfItems = [];

    var promArray = [];

    var prom = new Promise(function(resolve, reject) {
        PlantsFactory.getCurrentBlooming().then(function (response){
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
            console.log("this is the photo");
            //console.log(success);

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
    $scope.moveTo = function(item){

        $location.path('/plant/' + item.accession_number);

    };


});