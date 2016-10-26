app.controller('PhotoViewController', function($route, $scope, $rootScope, PlantsFactory, $window, PhotoFactory){

    $scope.click = function(){
        console.log("");
    };

    $scope.changedRoom = "";

    $scope.plantsURL = [];
    //todo look at the method that is going to close the pop up.


    $scope.chosenPicrture = "";

    $scope.x = {};
    $scope.$on('abc', function(event, data){
        $scope.addedMovePlants = data.any;
        console.log($scope.addedMovePlants);
        $scope.lol = "Seth Winslow";
        console.log($scope.lol);
        $scope.hamburger = console.log($scope.addedMovePlants.a[0].accession_number);
        console.log($scope.hamburger);
        $scope.x.name = $scope.addedMovePlants.a[0].accession_number;
        $scope.a = [];
        $scope.accession_number = "00000";


        for (var t = 0; t < $scope.addedMovePlants.a.length; t++){
            $scope.a[t] = $scope.addedMovePlants.a[t];
        }

        for (var a = 0; a < $scope.addedMovePlants.a.length; a++){
            console.log($scope.a[a]);
        }
        $scope.b ={
            name: $scope.addedMovePlants.a[0]
        };


    });

    $scope.plantIDURL = [];


    PhotoFactory.getPhtosByPlantID(2).then(function(response){
        var data = response.data.data;
        for (var i = 0; i < data.length; i++){
            $scope.plantIDURL = data[i];
            console.log(data[i].url);

            $scope.plantsURL[i] = data[i];
        }

        var value = false;

        if($scope.plant.species != ""){
            //console.log("we are getting here");

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


        //console.log("AAAAA");
        //for(var t = 0; t < $scope.plantsURL.length; t++){
        //    console.log($scope.plantsURL[t]);
        //}
        //console.log("AAAAA");




    });


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




    }








});


