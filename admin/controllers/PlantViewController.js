app.controller('PlantViewController', function($scope, UserFactory, CONFIG, countryFactory, $rootScope, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, TagFactory, $location, PlantCountryLinkFactory, PhotoFactory, splitFactory, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory) {

    UserFactory.getAuth().then(function(response){
        console.log("weeeeeeewwwwwwww");
        var data = response.data.data;
        console.log(data.authLevel);
        if (data.authLevel == 1){
            $scope.AuthUser = true;
        } else {
            $scope.AuthUser = false;
        }
        //$rootScope.apply();
        //$scope.apply();
    });

    $scope.iFrameURL = "http://localhost:8888/orchid_site/utilities/file_frame.php?session_key=" +$rootScope.userSessionKey +"&session_id=" +$rootScope.userSessionId +"&url_section=blah";

    //$scope.AuthUser = false;
    //
    //$scope.apply();
    //
    //$scope.AuthUser = false;
    //
    //$scope.$apply;

    var param1 = $routeParams.accession_number;

    //$scope.AuthUser = true;

    console.log(param1);

    $scope.PlantCountryNames = [];
    $scope.Tables = [];
    //$scope.createNew = false;
    $scope.createNew = false;
    $scope.noProfile = true;


    $scope.allCountires = [];
    $scope.plant_id_url = [];

    $scope.theSelectedProfilePicture = [];

    $scope.habitatPictures = [];
    $scope.otherPictures = [];
    $scope.deletedPictures = [];

    $scope.newHabitatList = [];
    $scope.newOtherList = [];

    $scope.similarPhotos = [];

    var newCountrySelections = [];

    PlantsFactory.getPlantByAccessionNumber(param1).then(function(response) {
        var plantData = response.data.data[0];
        console.log(plantData);
        var plant_id = response.data.data[0].id;

        Country = [];

        LocationFactory.getTableLocations().then(function(response) {
            var tableData = response.data.data;
            for (i = 0; i < tableData.length; i++) {
                $scope.Tables.push(tableData[i]);

            }
        });



        newLink = [];

        $scope.selectedCountry;
        $scope.selectedCountries = [];


        $scope.selectCountry = function() {
            $scope.allCountires.splice($scope.allCountires.indexOf($scope.selectedCountry.name));

            $scope.allCountires = $scope.allCountires.filter(function(countryObject) {
                if (countryObject.name == $scope.selectedCountry) {
                    $scope.selectedCountries.push(countryObject);
                    newCountrySelections.push(countryObject);
                }
                return countryObject.name !== $scope.selectedCountry;
            });

            $scope.selectedCountry = '';
        }

        $scope.plant = {
            id: plantData.id,
            accession_number: plantData.accession_number,
            name: plantData.name,
            authority: plantData.authority,
            distribution: plantData.distribution,
            habitat: plantData.habitat,
            culture: plantData.culture,
            donation: plantData.donation,
            date_recieved: createDateFromString(plantData.date_received),
            received_from: plantData.received_from,
            description: plantData.description,
            username: plantData.username,
            inactive: plantData.inactive,
            inactive_date: createDateFromString(plantData.inactive_date),
            inactive_comment: plantData.inactive_comment,
            size: plantData.size,
            value: plantData.value,
            parent_one: plantData.parent_one,
            parent_two: plantData.parent_two,
            grex_status: plantData.grex_status,
            hybrid_status: plantData.status,
            hybrid_comment: plantData.hybrid_comment,
            dead: plantData.dead,
            scientific_name: plantData.scientific_name,
            location_id: plantData.location_id,
            special_collections_id: plantData.special_collections_id,
            donation_comment: plantData.donation_comment,
            origin_comment: plantData.origin_comment,
            last_varified: createDateFromString(plantData.last_varified),
            is_donation: plantData.is_donation,
            class: plantData.class_name,
            tribe: plantData.tribe_name,
            subtribe: plantData.subtribe_name,
            genus: plantData.genus_name,
            species: plantData.species_name,
            variety: plantData.variety_name,
            image: "",
            dead_date: createDateFromString(plantData.dead_date)
        };

        var speciesName  = $scope.plant.species;
        var id = $scope.plant.id;

        PhotoFactory.getSimilarPhotos(speciesName).then(function (response){
            var photoData = response.data.data;
            for (var i = 0; i < photoData.length; i++) {
                if(photoData[i].plant_id == id){

                } else {
                    $scope.similarPhotos.push(photoData[i]);
                }
            }

            for (var i = 0; i < $scope.similarPhotos.length; i++) {
               console.log($scope.similarPhotos[i]);
            }
        });

        //FIXING THE DEAD AND INACTIVE DATES
        //var dead_date = $scope.plant.dead_date;
        //if (dead_date == 'NULL'){
        //    $scope.plant.dead_date = "NUL";
        //}

        var bloomPage = 0;
        $scope.blooms = [];
        $scope.getMoreBlooms = function(){
          bloomPage++;
          BloomingFactory.getBloomByPlantID($scope.plant.id, bloomPage).then(function(response){
            for(var i = 0; i < response.data.data.length; i++){
              $scope.blooms.push(response.data.data[i]);
            }
            for(var i = 0; i < $scope.blooms.length; i++){
              if($scope.blooms[i].end_date == "0000-00-00"){
                $scope.blooms[i].end_date = "present";
              }
            }
          })
        }
        $scope.getMoreBlooms();

        var sprayPage = 0;
        $scope.sprayed = [];
        $scope.getMoreSprayed = function(){
          sprayPage++;
          SprayedFactory.getPestByPlantID($scope.plant.id, sprayPage).then(function(response){
            for(var i = 0; i < response.data.data.length; i++){
              $scope.sprayed.push(response.data.data[i]);
            }
          })
        }
        $scope.getMoreSprayed();

        var repotPage = 0;
        $scope.repotted = [];
        $scope.getMoreRepotted = function(){
          repotPage++;
          PottingFactory.getBloomByPlantID($scope.plant.id, repotPage).then(function(response){
            for(var i = 0; i < response.data.data.length; i++){
              $scope.repotted.push(response.data.data[i]);
            }
          })
        }
        $scope.getMoreRepotted();

        var healthPage = 0;
        $scope.healthData = [];
        $scope.getMoreHealth = function(){
          healthPage++;
          HealthFactory.getHealthBtPlantID($scope.plant.id, healthPage).then(function(response){
            for(var i = 0; i < response.data.data.length; i++){
              $scope.healthData.push(response.data.data[i]);
            }
            console.log($scope.healthData);
          })
        }
        $scope.getMoreHealth();

        splitFactory.getSplitForPlantId($scope.plant.id).then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {

                var timestamp = response.data.data[i].timestamp;
                var newTimestamp = moment(timestamp).format('MM/DD/YYYY');
                console.log(timestamp, newTimestamp);
                response.data.data[i].timestamp = newTimestamp;
                $scope.splits.push(response.data.data[i]);
            }
        });

        PlantCountryLinkFactory.getCountryByPlantID($scope.plant.id).then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {
                $scope.selectedCountries.push(response.data.data[i][0]);
            }
        });

        LocationFactory.getTableNameFromID($scope.plant.location_id).then(function(response) {
            $scope.plant.locationName = response.data.data;

        });

        //todo need to look at why this is not pulling in the correct image
        PhotoFactory.getPhtosByPlantID($scope.plant.id).then(function(response) {
            //console.log(response.data.data);
            if (response.data.data != "") {
                var data = response.data.data;
                for (var i = 0; i < data.length; i++) {

                    if (data[i].type == "profile") {
                        $scope.plant.image = response.data.data[i];
                        $scope.theSelectedProfilePicture = data[i];
                        $scope.plant_id_url.push(response.data.data[i]);
                        $scope.noProfile = false;

                    } else {
                        //if not profile, add in the rest of the file
                        console.log("we are adding this picture" + response.data.data[i].id);
                        $scope.plant_id_url.push(response.data.data[i]);

                        if (data[i].type == "habitat") {
                            console.log("we just logged a habitat photo");
                            $scope.habitatPictures.push(data[i]);

                        } else if (data[i].type == "other") {
                            console.log("we just logged a other photo");

                            $scope.otherPictures = data[i].id;

                        }

                    }
                }

            }


        });

        countryFactory.getCountries().then(function(response) {
            var countryNames = response.data.data;
            $scope.example1data = [];
            for (var i = 0; i < countryNames.length; i++) {
                if (countryHasPlant(countryNames[i]) === false) {
                    $scope.allCountires.push(countryNames[i]);
                }
            }
        });

    }, function(error) {
        var param1 = $routeParams.accession_number;

        if (param1 == "create") {
            console.log("create is displayed");
            $scope.createNew = true;
            console.log();
            $scope.plant = {
                image: 'images/no_plant_icon.svg'
            };

            LocationFactory.getTableLocations().then(function(response) {
                var tableData = response.data.data;
                for (i = 0; i < tableData.length; i++) {
                    $scope.Tables.push(tableData[i]);
                }
            });

            countryFactory.getCountries().then(function(response) {
                var countryNames = response.data.data;
                $scope.example1data = [];

                for (var i = 0; i < countryNames.length; i++) {

                    // $scope.allCountires.push(countryNames[i]);

                }
            });

        } else {
            $location.path('/404');
        }

    });

    var createDateFromString = function(string){
      return moment(string).toDate();
    }

    if ($scope.createNew) {
        $scope.editPlant = {
            critical: false,
            taxonommy: false,
            culture: false,
            accesssion: false,
            description: false,
            hybrid: false,
            inactive: false,
            photos: false,
            save: false,
            split: false
        };
    } else {
        $scope.editPlant = {
            critical: true,
            taxonommy: true,
            culture: true,
            description: true,
            accesssion: true,
            hybrid: true,
            inactive: true,
            photos: true,
            save: true,
            split: true

        };



    }



    $scope.saveCulture = {
        taxonommy: false,
        culture: false,
        accesssion: false,
        hybrid: false
    };

    $scope.newPlant = {
        taxonomicRank: {
            class: '',
            tribe: '',
            authority: '',
            genus: '',
            species: '',
            variety: ''
        },
        culture: {
            distribution: '',
            country: '',
            habitat: ''
        },
        accesssion: {
            donatedTo: '',
            Recieved: '',
            dontationComment: ''
        },
        description: '',
        hybrid: {
            parentOne: '',
            parentTwo: '',
            grex: ''
        }
    };

    $scope.saveAll = function() {
        $scope.saveCritical();

    };

    //$scope.plant_id_url = [];

    $scope.otherList = [];
    $scope.habitiatList = [];
    $scope.deleteList = [];

    var OValue = false;

    $scope.changeOther = function(photo) {

        for (var i = 0; i < $scope.otherList.length; i++) {


            if ($scope.otherList[i].id == photo.id) {
                //they are matching
                OValue = true;
                break;
            }
        }

        if (OValue == false) {
            console.log("add1");
            var lengthList = $scope.otherList.length;
            $scope.otherList[lengthList] = photo;
        }



        for (var i = 0; i < $scope.habitiatList.length; i++) {
            if ($scope.habitiatList[i].id == photo.id) {
                $scope.habitiatList.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                $scope.deleteList.splice(i, 1);
                break;
            }
        }



    };

    var HValue = false;
    $scope.changeHabitat = function(photo) {

        for (var i = 0; i < $scope.habitiatList.length; i++) {


            if ($scope.habitiatList[i].id == photo.id) {
                //they are matching
                HValue = true;
                break;
            }
        }

        if (HValue == false) {
            console.log("add2");

            var lengthList = $scope.habitiatList.length;
            $scope.habitiatList[lengthList] = photo;
        }



        for (var i = 0; i < $scope.otherList.length; i++) {

            if ($scope.otherList[i].id == photo.id) {
                $scope.otherList.splice(i, 1);
            }
        }

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                $scope.deleteList.splice(i, 1);
            }
        }



    };

    var DValue = false;
    $scope.delete = function(photo) {
        console.log("we are at delete");


        for (var i = 0; i < $scope.deleteList.length; i++) {



            if ($scope.deleteList[i].id == photo.id) {
                //they are matching
                DValue = true;
                break;
            }
        }

        if (DValue == false) {
            console.log("add3");

            var lengthList = $scope.deleteList.length;
            $scope.deleteList[lengthList] = photo;
        }


        for (var i = 0; i < $scope.otherList.length; i++) {

            if ($scope.otherList[i].id == photo.id) {
                console.log("we are removing");
                $scope.otherList.splice(i, 1);
            }
        }

        for (var i = 0; i < $scope.habitiatList.length; i++) {

            if ($scope.habitiatList[i].id == photo.id) {
                $scope.habitiatList.splice(i, 1);
            }
        }



    };



    $scope.editPhotos = function() {
        if ($scope.editPlant.photos == false) {
            $scope.editPlant.photos = true;

            for (var i = 0; i < $scope.deletedPictures.length; i++) {
                console.log("we are logging the habitat info");
                var habitatInfo = {
                    id: $scope.deletedPictures[i].id

                };
                console.log('we are done editing: here is the habitat photo:');
                console.log(habitatInfo);
                PhotoFactory.deletePhoto(habitatInfo).then(function(response) {

                });
            }


            for (var i = 0; i < $scope.newHabitatList.length; i++) {
                console.log("we are logging the habitat info");
                var habitatInfo = {
                    id: $scope.newHabitatList[i].id,
                    plant_id: $scope.newHabitatList[i].plant_id,
                    url: $scope.newHabitatList[i].url,
                    type: "habitat"
                };
                console.log('we are done editing: here is the habitat photo:');
                console.log(habitatInfo);
                PhotoFactory.updatePhoto(habitatInfo).then(function(response) {

                });
            }

            for (var i = 0; i < $scope.otherList.length; i++) {

                var otherInformation = {
                    id: $scope.otherList[i].id,
                    plant_id: $scope.otherList[i].plant_id,
                    url: $scope.otherList[i].url,
                    type: "other"
                };
                PhotoFactory.updatePhoto(otherInformation).then(function(response) {

                });
            }


            if ($scope.theSelectedProfilePicture.id != ""){
                console.log("we are running ")
                var profile = {
                    id: $scope.theSelectedProfilePicture.id,
                    plant_id: $scope.theSelectedProfilePicture.plant_id,
                    url: $scope.theSelectedProfilePicture.url,
                    type: "profile"
                };
                console.log(profile);
                PhotoFactory.updatePhoto(profile).then(function(response) {
                    console.log(response);
                });
            } else {
                console.log("it is empty");
            }




        } else {
            $scope.editPlant.photos = false;
        }
    };

    $scope.newSplit = false;
    $scope.newPlantSplits = [];
    $scope.addPlantSplitFunction = function() {
        $scope.newSplit = true;
    }


    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;

            var taxonmicPlantInformation = {
                class_name: $scope.plant.class,
                tribe_name: $scope.plant.tribe,
                subtribe_name: $scope.plant.subtribe,
                genus_name: $scope.plant.genus,
                species_name: $scope.plant.species,
                variety_name: $scope.plant.variety,
                authority: $scope.plant.authority,
                id: $scope.plant.id
            }

            console.log(taxonmicPlantInformation);
            PlantsFactory.editTaxonmicPlant(taxonmicPlantInformation).then(function(response) {
                console.log(response);
                console.log("done");
            });



        } else {
            $scope.editPlant.taxonommy = false;
        }
    };

    $scope.editSplit = function() {
        if ($scope.editPlant.split == false) {
            $scope.editPlant.split = true;
            for (var i = 0; i < $scope.newPlantSplits.length; i++) {
                if ($scope.newPlantSplits[i].recipient !== '' && !$scope.newPlantSplits[i].timestamp !== null) {
                    var plantSplit = $scope.newPlantSplits[i];
                    console.log(plantSplit);
                    splitFactory.createNewSplit(plantSplit, $scope.plant.id).then(function(response) {
                        console.log(response);
                    });
                }
            }
            for (var i = 0; i < $scope.splits.length; i++) {
                console.log($scope.splits[i]);
                splitFactory.updateSplits($scope.splits[i], $scope.plant.id).then(function(response) {
                    console.log(response);
                });
            }
            var splitData = {
                "plant_id" : $scope.plant.id,
                "recipient" : $scope.newPlantSplit.recipient,
                "timestamp" : $scope.newPlantSplit.timestamp,
                "note" : $scope.newPlantSplit.note
            };
            console.log(splitData);
            console.log($scope.plant.id);
            splitFactory.createNewSplit(splitData, $scope.plant.id).then(function(response) {
                console.log(response);
            });
        } else {
            $scope.editPlant.split = false;
        }
    }

    $scope.newPlantSplit = {};

    $scope.newPlantSplits = [];
    $scope.addPlantSplit = function() {
        $scope.newPlantSplits.push({
            'recipient': '',
            'timestamp': ''
        });
    }

    function countryHasPlant(countryObject) {
        var isPlantInCountry = false;
        $scope.selectedCountries.forEach(function(country) {
            if (country.name == countryObject.name) {
                isPlantInCountry = true;
            }
        });

        return isPlantInCountry;
    }

    $scope.editInactive = function() {
        if ($scope.editPlant.inactive == false) {
            $scope.editPlant.inactive = true;
        } else {
            $scope.editPlant.inactive = false;
        }
    };

    $scope.saveCritical = function() {
        var criticalPlantInformation = {
            scientific_name: $scope.plant.scientific_name,
            name: $scope.plant.name,
            location_id: $scope.plant.location_id,
            accession_number: $scope.plant.accession_number
        };

        $scope.editPlant = {
            critical: false,
            taxonommy: false,
            culture: false,
            accesssion: false,
            description: false,
            hybrid: false,
            inactive: false,
            photos: false,
            save: false

        };
        console.log(criticalPlantInformation);
        PlantsFactory.createNewPlant(criticalPlantInformation).then(function(response) {
            console.log("AAA");
            console.log(response);
            console.log("AAA");
            $scope.plant.id = response.data.data.id;
            $scope.accession_number = response.data.data.accession_number;
            $scope.editTaxonomy();
            $scope.editCulture();
            $scope.editDescription();
            $scope.editHybrid();
            $scope.editInactive();
            $scope.editAccession();
            console.log($scope.accession_number);
            var x = $scope.accession_number;
            $location.path('/plant/' + x);
        });

    };

    $scope.profilePopUp = false;

    $scope.changeProfilePicture = function() {
        if ($scope.editPlant.photos == false) {
            console.log("show the pop up");
            $scope.profilePopUp = !$scope.profilePopUp;
        } else {
            //Do nothing since the section is not editable
        }
    };



    $scope.editCritical = function() {
        if ($scope.editPlant.critical == false) {
            $scope.editPlant.critical = true;

            var criticalPlantInformation = {
                scientific_name: $scope.plant.scientific_name,
                name: $scope.plant.name,
                location_id: 7,
                id: $scope.plant.id,
                accession_number: $scope.plant.accession_number
            };
            PlantsFactory.editCriticalPlant(criticalPlantInformation).then(function(response) {
                console.log(response.data);
            });

            var criticalPlantTable = {
                name: $scope.plant.locationName.name,
                id: $scope.plant.id
            }

            PlantsFactory.editCritialPlantTable(criticalPlantTable).then(function(response) {
                console.log(response.data);
            });

        } else {
            $scope.editPlant.critical = false;
        }
    };

    $scope.editCulture = function() {
        console.log();
        if ($scope.editPlant.culture == false) {
            // Update the record
            $scope.editPlant.culture = true;

            var culturePlantInformation = {
                distribution: $scope.plant.distribution,
                habitat: $scope.plant.habitat,
                location_id: 3,
                id: $scope.plant.id,
                origin_comment: $scope.plant.origin_comment
            };

            for (var i = 0; i < newCountrySelections.length; i++) {
                var plantCountryLink = {
                    "plantId": $scope.plant.id,
                    "countryId": newCountrySelections[i].id,
                }

                PlantCountryLinkFactory.createPlantCountryLink(plantCountryLink).then(function() {});
            }

            PlantsFactory.editCulturePlant(culturePlantInformation).then(function() {});
        } else {
            //change the state of the button
            $scope.editPlant.culture = false;
        }
    }

    $scope.editAccession = function() {
        if ($scope.editPlant.accesssion == false) {
            $scope.editPlant.accesssion = true;

            var accessionPlantInformation = {
                received_from: $scope.plant.received_from,
                donation_comment: $scope.plant.donation_comment,
                date_received: $scope.plant.date_recieved,
                id: $scope.plant.id
            }

            PlantsFactory.editAccessionPlant(accessionPlantInformation).then(function(response) {
                console.log(response.data);
            });
        } else {
            $scope.editPlant.accesssion = false;
        }
    }

    $scope.editDescription = function() {
        if ($scope.editPlant.description == false) {
            $scope.editPlant.description = true;
            var descriptionPlantInformation = {
                description: $scope.plant.description,
                id: $scope.plant.id
            };

            PlantsFactory.editDescription(descriptionPlantInformation).then(function(response) {
                console.log(response.data);
            });
        } else {
            $scope.editPlant.description = false;
        }
    };

    $scope.editHybrid = function() {
        if ($scope.editPlant.hybrid == false) {
            $scope.editPlant.hybrid = true;

            var hybridPlantInformation = {
                parent_one: $scope.plant.parent_one,
                parent_two: $scope.plant.parent_two,
                grex_status: $scope.plant.grex_status,
                hybrid_comment: $scope.plant.hybrid_comment,
                id: $scope.plant.id
            };

            PlantsFactory.editHybird(hybridPlantInformation).then(function(response) {
                console.log(response.data);
            });
        } else {
            $scope.editPlant.hybrid = false;

        }
    }

    $scope.click = function() {
        console.log("we just clicked the image");
    }


    $scope.showMoveFunction = function() {
        console.log("we are going to the pop up");
        $rootScope.$broadcast('abc', {
            any: {
                'accession_number': $scope.plant.accession_number
            }
        });
        $scope.showPopup2 = !$scope.showPopup2;
    };

    $scope.addPhotoList = [];

    $scope.newPhotoLink = function (photo){
        var changed = false;
        for (var i = 0; i < $scope.addPhotoList.length; i++){
            if(photo.id == $scope.addPhotoList[i].id){
                $scope.addPhotoList.splice(i, 1);
                changed = true;
                console.log("we have deleted the photo");
            }
        }
        if(changed == false){
            //we need to made a change
            //for (var i = 0; i < $scope.plant_id_url.length; i++){
            //    if ($scope.plant_id_url[i].id == photo.id){
            //        var index = i;
            //        break;
            //    }
            //}

            console.log("we have added the photo");

            $scope.addPhotoList.push(photo);
        }

    };

    $scope.saveNewPhotos = function(){
        for(var k = 0; k < $scope.addPhotoList.length; k++){
            var photoInfo = {
                'plant_id' : $scope.plant.id,
                'url' : $scope.addPhotoList[k].url,
                'type' : "Habitat",
                'fileName' : $scope.addPhotoList[k].fileName
            }
            PhotoFactory.createPhoto(photoInfo).then(function (response){
                console.log("we are done creating the photo");
                console.log(response);

            })
        }
    }


    $scope.profileSelected = function(photo) {
        console.log("we have selected the profile function " + photo.id);
        if (photo.id == $scope.theSelectedProfilePicture.id) {
            //stays the same
        } else {
            console.log("we made it to the for loop");

            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.theSelectedProfilePicture.id == $scope.plant_id_url[i].id){
                    var oldPhoto = $scope.plant_id_url[i];
                    $scope.plant_id_url[i].type = 'habitat';
                    console.log("we made it to the profile");
                    console.log(oldPhoto);
                    $scope.newHabitatList.push(oldPhoto);

                    break;
                } else {

                }
            }
            photo.type = 'profile';
            $scope.theSelectedProfilePicture = photo;

            console.log("we have changed the profile picture");
            console.log(photo.id);

            $rootScope.apply;

        }


    };

    $scope.otherSelected = function(photo) {

        var noChange = false;
        for (var i = 0; i < $scope.otherPictures.length; i++){
            if(photo.id == $scope.otherPictures[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }
        if(noChange == false){
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.plant_id_url[i].id == photo.id){
                    var index = i;
                    break;
                }
            }

            $scope.otherList.push(photo);
            $scope.plant_id_url[index].type = 'other';
            for(var j = 0; j < $scope.habitatPictures.length; j++){
                if(photo.id == $scope.habitatPictures[j].id){
                    $scope.habitatPictures.splice(j, 1);
                    break;
                }
            }
            if(photo.id == $scope.theSelectedProfilePicture.id) {
                $scope.theSelectedProfilePicture = "";
            }

        }

        $rootScope.apply;


    };

    $scope.deletedSelcted = function(photo){
        var noChange = false;
        for (var i = 0; i < $scope.deletedPictures.length; i++){
            if(photo.id == $scope.deletedPictures[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }

        if(noChange == false){
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.plant_id_url[i].id == photo.id){
                    var index = i;
                    break;
                }
            }

            $scope.deletedPictures.push(photo);
            $scope.plant_id_url[index].type = 'del';
            for(var j = 0; j < $scope.habitatPictures.length; j++){
                if(photo.id == $scope.habitatPictures[j].id){
                    $scope.habitatPictures.splice(j, 1);
                    break;
                }
            }
            for(var j = 0; j < $scope.otherPictures.length; j++){
                if(photo.id == $scope.otherPictures[j].id){
                    $scope.otherPictures.splice(j, 1);
                    break;
                }
            }
            if(photo.id == $scope.theSelectedProfilePicture.id) {
                $scope.theSelectedProfilePicture = "";
            }


        }

        $rootScope.apply;

    };

    $scope.habitatSelected = function(photo) {

        var noChange = false;
        for (var i = 0; i < $scope.habitatPictures.length; i++){
            if(photo.id == $scope.habitatPictures[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }
        if(noChange == false){
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.plant_id_url[i].id == photo.id){
                    var index = i;
                    break;
                }
            }

            $scope.habitiatList.push(photo);
            $scope.plant_id_url[index].type = 'habitat';
            for(var j = 0; j < $scope.otherPictures.length; j++){
                if(photo.id == $scope.otherPictures[j].id){
                    $scope.otherPictures.splice(j, 1);
                    break;
                }
            }
            if(photo.id == $scope.theSelectedProfilePicture.id) {
                $scope.theSelectedProfilePicture = "";
            }


        }

        $rootScope.apply;

    };

    $scope.uploadFileUrl = function(url, b){
        var baseURL = "http://s3.amazonaws.com/bsuorchid/";
        var fileName = url.split(baseURL)[1];
        var photo = {
          'plant_id' : $scope.plant.id,
            'url' : url,
            'type' : 'habitat',
            'fileName' : fileName
        };

        PhotoFactory.createPhoto(photo).then(function (response){

        });
    }

});
