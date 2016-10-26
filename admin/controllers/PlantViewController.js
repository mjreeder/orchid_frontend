app.controller('PlantViewController', function($scope, CONFIG, countryFactory, $rootScope, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, TagFactory, $location, PlantCountryLinkFactory, PhotoFactory, splitFactory) {

    var param1 = $routeParams.accession_number;

    console.log(param1);




    // THIS IS GETTING ALL THE COUNTRIES!!!
    //
    //    $scope.AllCountry = [];

    //
    //countryFactory.getCountries().then(function (response){
    //    console.log(response.data.data);
    //
    //    countryArray = response.data.data;
    //    for (i = 0; i < countryArray.length; i++){
    //        var name = countryArray[i].name;
    //        $scope.AllCountry.push(name);
    //    }
    //
    //});



    $scope.PlantCountryNames = [];
    $scope.Tables = [];
    //$scope.createNew = false;
    $scope.createNew;

    $scope.allCountires = [];
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

        // PlantCountryLinkFactory.getCountryByPlantID(plant_id).then(function(response) {
        //     var plantCountryData = response.data.data;
        //     for (i = 0; i < plantCountryData.length; i++) {
        //         var nme = plantCountryData[i].name;
        //         console.log(nme);
        //         $scope.PlantCountryNames.push(nme);
        //         console.log($scope.PlantCountryNames);
        //     }
        // });

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
            date_recieved: plantData.date_received,
            received_from: plantData.received_from,
            description: plantData.description,
            username: plantData.username,
            inactive: plantData.inactive,
            inactive_date: plantData.inactive_date,
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
            last_varified: plantData.last_varified,
            is_donation: plantData.is_donation,
            aaa: new Date(2014, 02, 03),
            class: plantData.class_name,
            tribe: plantData.tribe_name,
            subtribe: plantData.subtribe_name,
            genus: plantData.genus_name,
            species: plantData.species_name,
            variety: plantData.variety_name,
            image: "http://placekitten.com/g/200/300",
            dead_date: plantData.dead_date
        };
        //console.log("aaa");
        //console.log($scope.plant.date_recieved);
        //console.log("aaa");
        $scope.splits = [];
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

        console.log($scope.plant.aaa);

        $scope.createNew = false;


        //todo need to look at why this is not pulling in the correct image
        PhotoFactory.getPhtosByPlantID($scope.plant.id).then(function(response) {
            if (response.data.data != "") {
                var data = response.data.data;
                for (var i = 0; i < data.length; i++) {

                    if (data[i].type == "profile") {
                        $scope.plant.image = response.data.data[i];
                        break;
                    } else {
                        // Keep looking
                    }
                }

            }
        });

        classificationLinkFactory.getPlantHierarchy($scope.plant.id).then(function(response) {
            console.log(response.data.data);
            var data = response.data.data;
            $scope.classification = {
                class: "",
                tribe: "",
                subtribe: "",
                genus: "",
                variety: "",
                species: ""
            };

            for (var i = 0; i < data.length; i++) {
                var object = data[i];
                var classificationName = object.name;
                var scientificName = object.scientific_class_name;
                if (classificationName == "class") {
                    $scope.classification.class = scientificName;
                }
                if (classificationName == "tribe") {
                    $scope.classification.tribe = scientificName;
                }
                if (classificationName == "subtribe") {
                    $scope.classification.subtribe = scientificName;
                }

                if (classificationName == "genus") {
                    $scope.classification.genus = scientificName;
                }
                if (classificationName == "species") {
                    $scope.classification.species = scientificName;
                }
                if (classificationName == "variety") {
                    $scope.classification.variety = scientificName;
                }
                console.log($scope.classification);
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

    $scope.plant_id_url = [];

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


    PhotoFactory.getPhtosByPlantID(2).then(function(response) {
        var count = 0;
        var data = response.data.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].type != 'profile') {
                $scope.plant_id_url[count] = data[i];
                count++;
                console.log(data[i]);
            }
        }
        console.log("AAAA");
        for (var i = 0; i < $scope.plant_id_url.length; i++) {
            console.log($scope.plant_id_url[i]);

        }
        console.log("AAAA");

    });


    $scope.editPhotos = function() {
        if ($scope.editPlant.photos == false) {
            $scope.editPlant.photos = true;

            for (var i = 0; i < $scope.otherList.length; i++) {
                var photoInformation2 = {
                    id: $scope.otherList.id,
                    plant_id: $scope.otherList.plant_id,
                    url: $scope.otherList.url,
                    type: "other"
                };
                PhotoFactory.updatePhoto(photoInformation2).then(function(response) {

                });
            }

            for (var i = 0; i < $scope.habitiatList.length; i++) {
                var photoInformation3 = {
                    id: $scope.otherList.id,
                    plant_id: $scope.otherList.plant_id,
                    url: $scope.otherList.url,
                    type: "habitat"
                };
                PhotoFactory.updatePhoto(photoInformation3).then(function(response) {

                });
            }


        } else {
            $scope.editPlant.photos = false;
        }
    };

    $scope.editSplit = function() {
        if ($scope.editPlant.split == false) {
            $scope.editPlant.split = true;
            for (var i = 0; i < $scope.newPlantSplits.length; i++) {
                if ($scope.newPlantSplits[i].recipient !== '' && !$scope.newPlantSplits[i].timestamp !== null) {
                    var plantSplit = $scope.newPlantSplits[i];
                    console.log(plantSplit);
                    plantSplit.timestamp = moment(plantSplit).format('YYYY-MM-DD');
                    splitFactory.createNewSplit(plantSplit, $scope.plant.id).then(function(response) {
                        console.log(response);
                    });
                }
            }
        } else {
            $scope.editPlant.split = false;
        }
    }

    $scope.newPlantSplits = [];
    $scope.addPlantSplit = function() {
        $scope.newPlantSplits.push({
            'recipient': '',
            'timestamp': ''
        });
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
                    plantSplit.timestamp = moment(plantSplit).format('YYYY-MM-DD');
                    splitFactory.createNewSplit(plantSplit, $scope.plant.id).then(function(response) {
                        console.log(response);
                    });
                }
            }
        } else {
            $scope.editPlant.split = false;
        }
    }

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
        if ($scope.editPlant.critical == false) {
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
        $rootScope.$broadcast('hi');
    };





});
