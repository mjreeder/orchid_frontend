app.controller('PhotoViewController', function($route, $scope, $rootScope, PlantsFactory, $window, PhotoFactory){

    $scope.plantsURL = [];

    $scope.similarPhotos = [];

    var plant_id;
    $scope.$on('abc', function(event, data){
        $scope.addedMovePlants = data.any;
        plant_id = $scope.addedMovePlants.plant_id;
        $scope.reloadFunction(plant_id);
    });

    $scope.plantIDURL = [];


    $scope.newPhotoLink = function (photo) {
        for(var i = 0; i < $scope.similarPhotos.length; i++){
            var index = -1;
            if($scope.similarPhotos[i].id == photo.id) {
                console.log("we have the index");
                console.log(index);
                index = i;
                break;
            }
        }
        var changed = false;

        for (var i = 0; i < $scope.addPhotoList.length; i++) {

            if (photo.id == $scope.addPhotoList[i].id) {
                $scope.addPhotoList.splice(i, 1);
                $scope.similarPhotos[i].clicked = "NO";
                changed = true;
            }
        }

        if (changed == false) {
            console.log("we are changing");
            $scope.addPhotoList.push(photo);
            $scope.similarPhotos[index].clicked = "YES";
            $scope.addPhotoList.checked = true;

        }
    };
        $scope.reloadFunction = function(plant_id){

        PhotoFactory.getPhtosByPlantID(plant_id).then(function(response){
            $scope.plantsURL = [];
            var data = response.data.data;
            for (var i = 0; i < data.length; i++){
                $scope.plantIDURL = data[i];
                $scope.plantsURL[i] = data[i];
            }

            var correctData = false;

            if($scope.plant.species != "" && $scope.plant.genus != ""){
                var data = {
                    "genus" : $scope.plant.genus,
                    "species" : $scope.plant.species
                };

                correctData = true;
            } else if ($scope.plant.species == "" && $scope.plant.genus != ""){
                var data = {
                    "genus" : $scope.plant.genus,
                    "species" : "NULL"
                };


                correctData = true;
            } else if ($scope.plant.species != "" && $scope.plant.genus == ""){
                var data = {
                    "genus" : "NULL",
                    "species" : $scope.plant.species
                };


                correctData = true;
            }

            if(correctData == true){
                $scope.similarPhotos = [];
                PhotoFactory.getSimilarPhotos(data).then(function (response) {
                    var data2 = response.data.data;

                    for (var i = 0; i < data2.length; i++){
                        var photoAdded = false;
                        var singlePhoto = data2[i];

                        for (var p = 0; p < $scope.plantsURL.length; p++){
                            if(singlePhoto.url == $scope.plantsURL[p].url){
                                photoAdded = true;
                                break;
                            }
                        }
                        if(photoAdded == false){
                            $scope.similarPhotos.push(singlePhoto);
                        }
                    }
                    for(var j = 0; j < $scope.similarPhotos.length; j++){
                        $scope.similarPhotos[j].clicked = "NO";
                    }
                });
            } else {
                window.alert('Please add a genus or species to match photos.');
            }
        });
    };

    $scope.saveNewPhotos = function(){
        for(var k = 0; k < $scope.addPhotoList.length; k++){
            var photoInfo = {
                'plant_id' : $scope.plant.id,
                'url' : $scope.addPhotoList[k].url,
                'thumb_url' : $scope.addPhotoList[k].thumb_url,
                'type' : "Habitat",
                'fileName' : $scope.addPhotoList[k].fileName
            };
            PhotoFactory.createPhoto(photoInfo).then(function (response){
                console.log("photo created");
            }, function (error){
                console.log('Error');
                console.log(error);
            });
        }
        $route.reload();
        $rootScope.$broadcast('photoMatcher', false);
    };

    $scope.submitChange = function(){

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
                PhotoFactory.updatePhoto(photoInformation2).then(function (response){

                });
            } else {
                var photoInformation4 = {
                    plant_id: $scope.plant.image.plant_id,
                    url: $scope.chosenPicrture.url,
                    type: "profile"
                };

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
        closePop();
    };

    $scope.closePopUp = function(){
        $rootScope.$broadcast('photoMatcher', false);
    }
});


