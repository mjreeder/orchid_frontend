orchidApp.controller('specificSubTribeController', ['$scope', '$location', '$state', '$stateParams', 'PlantsFactory', 'PhotoFactory', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {


    $scope.NAMEOFPAGE = $stateParams.tribe;

    //$scope.tribes = [];
    //$scope.tribes.push({name:"tribe1"});
    //$scope.tribes.push({name:"tribe2"});
    //$scope.tribes.push({name:"tribe3"});
    //$scope.tribes.push({name:"tribe4"});
    //$scope.tribes.push({name:"tribe5"});
    //$scope.tribes.push({name:"tribe6"});


    $scope.allItems = [];

    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    }


    var array = [];

    var prom = new Promise(function(resolve, reject) {
        PlantsFactory.getPlantsFromSubTribe($scope.NAMEOFPAGE).then(function(response){
            resolve(response);
        });

    });
    $scope.collectionOfItems = [];

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

        //$scope.continueLoading();
    }, function (error) {

    });

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
        var lengthOfSpecies = 0;
        if (speciesCollectionsData.length > 5){
            lengthOfSpecies = 6;
        } else {
            lengthOfSpecies = speciesCollectionsData.length;
        }
        for(i = 0; i < lengthOfSpecies; i++){
            if(speciesCollectionsData[i].tribe_name == ""){

            } else {
                var name = speciesCollectionsData[i].tribe_name;
                speciesCollectionsData[i].name = name;
                $scope.dynamicSidebarContent.subtribes.push(speciesCollectionsData[i]);

            }
        }

        //for(i = 0; i < speciesCollectionsData.length; i++){
        //    if(speciesCollectionsData[i].tribe_name == ""){
        //
        //    } else {
        //        var name = speciesCollectionsData[i].tribe_name;
        //        speciesCollectionsData[i].name = name;
        //        $scope.collectionOfItems.push(speciesCollectionsData[i]);
        //    }
        //}

        for(i = 0; i < $scope.dynamicSidebarContent.subtribes.length; i++){
            console.log($scope.dynamicSidebarContent.subtribes[i]);
        }
        $scope.continueLoad();
        $scope.$apply();

    }, function (error) {

    });

    $scope.continueLoad = function(){
        var photoArray = [];
        console.log($scope.collectionOfItems.length);
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;

            console.log($scope.collectionOfItems[i].id);

            if($scope.collectionOfItems[i].id == undefined){

            } else {
                PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                    console.log(response);
                });
                var prom = new Promise(function(resolve, reject) {
                    PhotoFactory.getPhotosByPlantID($scope.collectionOfItems[i].id).then(function (response){
                        resolve(response);
                    })
                });

                photoArray.push(prom);

            }



        }

        Promise.all(photoArray).then(function (success) {
            var cleanList = [];
            console.log(success);

            for(var i = 0; i < success.length; i++){
                for (var j = 0; j < success[i].data.data.length; j++){
                    cleanList.push(success[i].data.data[j])
                }
                console.log(success[i].data.data);
                if(success[i].data.data.length == undefined){

                }else {
                    console.log(success[i].data.data.length);
                }
            }


            for(var t = 0; t < cleanList.length; t++){
                console.log(cleanList[t].plant_id);
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    $scope.collectionOfItems[i].hasPicture = false;
                    console.log(cleanList[t].url);

                    if (cleanList[t].plant_id == $scope.collectionOfItems[i].id){
                        $scope.collectionOfItems[i].picture = cleanList[t].url;
                        $scope.collectionOfItems[i].hasPicture = true;
                        break;
                    }
                }
            }

            $scope.$apply();



        }, function (error) {

            //$state.go("404")
        });

    }









}]);