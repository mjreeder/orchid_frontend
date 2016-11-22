app.controller('PhotoViewController', function($route, $scope, $rootScope, PlantsFactory, $window, PhotoFactory){

    $scope.click = function(){
        console.log("");
    };


    $scope.changedRoom = "";

    $scope.plantsURL = [];
    //todo look at the method that is going to close the pop up.


    $scope.chosenPicrture = "";

    $scope.x = {};
    var plant_id;
    $scope.$on('abc', function(event, data){
        console.log("this is the end");
        $scope.addedMovePlants = data.any;
        console.log($scope.addedMovePlants.plant_id);
        plant_id = $scope.addedMovePlants.plant_id;
        $scope.reloadFunction(plant_id);

        $scope.hamburger = console.log($scope.addedMovePlants.a[0].accession_number);
        console.log($scope.hamburger);
        $scope.x.name = $scope.addedMovePlants.a[0].accession_number;


    });

    $scope.plantIDURL = [];


    $scope.reloadFunction = function(plant_id){
        console.log("THIS IS THE PLANT ID" + plant_id);

        PhotoFactory.getPhtosByPlantID(plant_id).then(function(response){
            var data = response.data.data;
            for (var i = 0; i < data.length; i++){
                $scope.plantIDURL = data[i];
                $scope.plantsURL[i] = data[i];
            }

            var value = false;

            if($scope.plant.species != ""){

                PhotoFactory.getSimilarPhotos($scope.plant.species).then(function (response) {
                    var data2 = response.data.data;
                    for (var i = 0; i < data.length; i++){
                        var singlePhoto = data2[i];
                        for (var p = 0; p < $scope.plantsURL.length; p++){
                            if(singlePhoto.url == $scope.plantsURL[p]){
                                value = true;
                                break;
                            }else {

                            }
                        }
                        if (value == true){
                            break;
                        }
                    }
                    if(value == false){
                        var lengthOfPlantsURL = $scope.plantsURL.length;
                        $scope.plantsURL[lengthOfPlantsURL] = data2[i];
                    }
                });

            }

        });

    }










    $scope.clickedPhoto = function(photo){
        $scope.chosenPicrture = photo;
    };

    $scope.submitChange = function(){
        //create a new entry in the backend if the plant does not have a profile pcture

        console.log("we are here at the submit change");
        console.log($scope.plant.id);
        if($scope.plant.image != ""){
            //update the old picture to go to other
            var photoInformation = {
                id: $scope.plant.image.id,
                plant_id: $scope.plant.image.plant_id,
                url: $scope.plant.image.url,
                type: "other"
            };
            PhotoFactory.updatePhoto(photoInformation).then(function (response){

            });

            //either create a new link or update the file
            if($scope.chosenPicrture.plant_id == $scope.plant.id){
                var photoInformation2 = {
                    id: $scope.chosenPicrture.id,
                    plant_id: $scope.plant.image.plant_id,
                    url: $scope.chosenPicrture.url,
                    type: "profile"
                };
                console.log(photoInformation2);

                PhotoFactory.updatePhoto(photoInformation2).then(function (response){

                });
            } else {
                var photoInformation4 = {
                    plant_id: $scope.plant.image.plant_id,
                    url: $scope.chosenPicrture.url,
                    type: "profile"
                };
                console.log(photoInformation4);

                PhotoFactory.createPhoto(photoInformation4).then(function (response){

                });

            }


        } else {

            var photoInformation3 = {
                plant_id: $scope.plant.image.plant_id,
                url: $scope.chosenPicrture.url,
                type: "profile"
            }
            PhotoFactory.createPhoto(photoInformation3).then(function (response){

            });

        }

        //if they do, then we will update the url

        // the old url is going to  change to an other photo with the same plant_id

        closePop();
    }


    var closePop = function(){
        console.log("we are closing the pop up");

    }
    $scope.closePopUp = function(){
        console.log("close the pop up");
        $rootScope.$broadcast('photoMatcher', false);
    }

});


