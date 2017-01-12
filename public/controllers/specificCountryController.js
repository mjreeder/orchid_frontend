orchidApp.controller('specificCountryController', function($scope, $location, $state, $stateParams, countryFactory, PlantsFactory, PhotoFactory, $error) {
    $scope.NAMEOFPAGE = $stateParams.country;

    $scope.currentCountries = [];
    $scope.collectionOfItems = [];


    var promArray = [];

    var prom = new Promise(function(resolve, reject) {
        countryFactory.getCurrentCountires().then(function (response){
            resolve(response);
        });
    });
    promArray.push(prom);

    Promise.all(promArray).then(function (success) {

        $scope.currentCountries = success[0].data.data;

        for(var i = 0; i < $scope.currentCountries.length; i++){
            if($scope.NAMEOFPAGE == $scope.currentCountries[i].name){
               $scope.countineLoad();
            } else {

            }
        }


    }, function (error) {
        $error.handle(error);
    });

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

        $scope.continueLoad();

    }, function (error) {
        $error.handle(error);
    });


    $scope.continueLoad = function(){
        var countryArray = [];

        var prom = new Promise(function(resolve, reject) {
            PlantsFactory.getCountries($scope.NAMEOFPAGE).then(function(response){
                resolve(response);
            });
        });

        countryArray.push(prom);

        Promise.all(countryArray).then(function (success) {

            var newData = success[0].data.data;

            for(var i = 0; i < newData.length; i++){
                $scope.collectionOfItems.push(newData[i]);
            }

            $scope.$apply();
            $scope.continueLoading();

        }, function (error) {

        });



    };

    $scope.continueLoading = function(){
        var photoArray = [];
        for(var  i = 0; i < $scope.collectionOfItems.length; i++){
            $scope.collectionOfItems[i].hasPicture = false;
            $scope.collectionOfItems[i].display_name = $scope.collectionOfItems[i].scientific_name;


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
                for (var j = 0; j < success[i].data.data.length; j++){
                    cleanList.push(success[i].data.data[j]);
                }
            }

            for(var t = 0; t < cleanList.length; t++){
                for(var i = 0; i < $scope.collectionOfItems.length; i++){
                    if (cleanList[t].plant_id == $scope.collectionOfItems[i].id){
                        $scope.collectionOfItems[i].picture = cleanList[t].thumb_url;
                        $scope.collectionOfItems[i].hasPicture = true;
                        break;
                    }
                }
            }

            for(var i = 0; $scope.collectionOfItems.length; i++)
            {
                console.log($scope.collectionOfItems[i].name);
                if($scope.collectionOfItems[i].name.length == 0){
                    $scope.collectionOfItems[i].name = "<NO COMMON NAME>";
                } else {

                }
                $scope.$apply();

            }
            $scope.$apply();

        }, function (error) {
            $state.go("404")
        });

    }

    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    }
});