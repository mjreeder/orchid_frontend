app.controller('PlantViewController', function($window, $scope, UserFactory, CONFIG, countryFactory, $rootScope, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, bloomService, TagFactory, $location, PlantCountryLinkFactory, PhotoFactory, splitFactory, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, VerifiedFactory, $anchorScroll, SpecialCollectionsFactory, $route, taxonommyFactory) {


    $scope.iFrameURL = location.origin +"/2016/orchid_site/utilities/file_frame.php?session_key=" +$rootScope.userSessionKey +"&session_id=" +$rootScope.userSessionId +"&url_section=blah";

    var param1 = $routeParams.accession_number;

    $scope.PlantCountryNames = [];
    $scope.Tables = [];
    //$scope.createNew = false;
    $scope.createNew = false;
    $scope.noProfile = true;

    $scope.newAcceessionNumer = 0;

    $scope.allCountires = [];
    $scope.plant_id_url = [];

    $scope.theSelectedProfilePicture = [];

    $scope.habitatPictures = [];
    $scope.otherPictures = [];
    $scope.deletedPictures = [];

    $scope.newHabitatList = [];
    $scope.newOtherList = [];

    $scope.similarPhotos = [];

    $scope.verifiedObject = {};
    $scope.verifiedDate = "";
    $scope.splits = [];

    //View More Toggles
    $scope.bloomingMoreShow = true;
    $scope.sprayedMoreShow = true;
    $scope.repottedMoreShow = true;
    $scope.healthMoreShow = true;

    //COLLECTIONS
    $scope.allCollections = [];
    $scope.selectedCollectionName = "";

    $scope.selectedCountry = "";


    $scope.plantLocation = "";

    $scope.collectionWarning = false;
    $scope.selectedSpecialCollectionDeletedName = "";

    //boolean to see if there is a verifed object
    $scope.isVerified;

    SpecialCollectionsFactory.getAllSpecialCollections().then(function(response){
        var responseAllCollections = response.data.data;
        for(var i = 0; i < responseAllCollections.length; i++){
            $scope.allCollections.push(responseAllCollections[i]);
        }
    });

    countryFactory.getCountries().then(function(response) {
        var countryNames = response.data.data;

        for (var i = 0; i < countryNames.length; i++) {
            $scope.allCountires.push(countryNames[i]);
        }

    });

    var newCountrySelections = [];
    var newCountryAllSelections = [];

    $scope.origianlSelectedCountries = [];

    $scope.selectedCountry;
    $scope.deselectedCountry;

    $scope.selectedCountries = [];

    $scope.selectCountry = function() {
        //loop over the all countries and only return those that are not the selected country
        $scope.allCountires = $scope.allCountires.filter(function(countryObject) {
            if (countryObject.name == $scope.selectedCountry) {
                $scope.selectedCountries.push(countryObject);
                newCountrySelections.push(countryObject);
            }
            return countryObject.name !== $scope.selectedCountry;
        });

        //empty out selected country
        $scope.selectedCountry = '';

        //sort the selected countries
        $scope.selectedCountries.sort(function (a, b){
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1:0;
        });
    };

    $scope.deselectCountryFunction = function(country){
        $scope.selectedCountries = $scope.selectedCountries.filter(function (countryObject){

            if (countryObject.name == $scope.deselectedCountry){
                $scope.allCountires.push(countryObject);
                newCountryAllSelections.push(countryObject);
            }

            return countryObject.name !== $scope.deselectedCountry;
        });
        $scope.deselectedCountry = '';

        $scope.allCountires.sort(function (a, b){
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1:0;
        });
    }

    PlantsFactory.getPlantByAccessionNumber(param1).then(function(response) {
        var plantData = response.data.data[0];
        var plant_id = response.data.data[0].id;

        Country = [];

        LocationFactory.getTableLocations().then(function(response) {
            var tableData = response.data.data;
            for (i = 0; i < tableData.length; i++) {
                $scope.Tables.push(tableData[i]);
            }
            $scope.Tables = _.sortBy($scope.Tables, ['name']);

        });

        newLink = [];

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
            class: plantData.class,
            tribe: plantData.tribe,
            subtribe: plantData.subtribe,
            genus: plantData.genus,
            species: plantData.species,
            variety: plantData.variety,
            phylum: plantData.phylum,
            image: "",
            dead_date: createDateFromString(plantData.dead_date),
            general_note: plantData.general_note,
            countries_note: plantData.countries_note
        };

        //assigning the table to plant.
        $scope.plantLocation = plantData.location;


        $scope.originalAccessionNumber = $scope.plant.accession_number;

        var speciesName  = $scope.plant.species;
        var id = $scope.plant.id;

        var promArray1 = [];

        var prom = new Promise(function(resolve, reject) {
            SpecialCollectionsFactory.getSpecificSpecialCollectionID(id).then(function(response){
                resolve(response.data.data);
            });

        });

        promArray1.push(prom);

        Promise.all(promArray1).then(function (success) {

            var data = success[0];

            $scope.plant.special_collections_id = data[0].special_collections_id;
            $scope.loadSpecialCollection( $scope.plant.special_collections_id);

        }, function (error) {

        });


        PhotoFactory.getSimilarPhotos(speciesName).then(function (response){
            var photoData = response.data.data;
            var count = 0;
            if(photoData != undefined){

                for (var i = 0; i < photoData.length; i++) {
                    var didAdd = false;

                    if(photoData[i].plant_id == id){

                    } else {

                        for(var t = 0; t < $scope.similarPhotos.length; t++){
                            if($scope.similarPhotos[t].url == photoData[i].url){
                                didAdd = true;
                                break;
                            } else {
                            }
                        }
                        if(didAdd == false){
                            $scope.similarPhotos.push(photoData[i]);
                        }
                    }
                }

                for(var i = 0;i < $scope.similarPhotos.length; i++){
                    $scope.similarPhotos[i].clicked = "NO";
                }
            }

        });

        VerifiedFactory.getLastVerifiedDate(id).then(function (response){
            if(response.data.data.length == 0){
                $scope.isVerified = false;
            }else {
                $scope.isVerified = true;
                var data = response.data.data;
                $scope.verifiedObject = data[0];
                $scope.verifiedDate = createDateFromString(data[0].verified_date);
            }
        });

        var bloomPage = 0;
        $scope.blooms = [];
        $scope.bloomYears = [];
        $scope.getMoreBlooms = function() {
          bloomPage++;
          BloomingFactory.getBloomByPlantID($scope.plant.id, bloomPage).then(function(response) {
            var data = response.data.data;
            if (data.length < 5) {
              $scope.bloomingMoreShow = false;
            }
            for (var i = 0; i < data.length; i++) {
              $scope.blooms.push(data[i]);
              if (isInBloomYears(data[i]) == false) {
                $scope.bloomYears.push({
                  "year": moment(data[i].start_date, "YYYY/MM/DD").year(),
                  "dateObj": data[i].start_date
                })
              }
            }

            if($scope.bloomYears[0]){
              $scope.loadBloomGraph($scope.bloomYears[0]);
            }

            for (var i = 0; i < $scope.blooms.length; i++) {
              if ($scope.blooms[i].end_date == "0000-00-00") {
                $scope.blooms[i].end_date = "present";
              }
            }
          })
        }

        $scope.getMoreBlooms();

        function isInBloomYears(year) {
          for (var i = 0; i < $scope.bloomYears.length; i++) {
            if ($scope.bloomYears[i].year == moment(year.start_date, "YYYY/MM/DD").year()) {
              return true;
            }
          }
          return false;
        }

        // function to load bloom graph for a given calender year,
        $scope.loadBloomGraph = function(year) {
          document.getElementById("bloom_timeline").innerHTML = "";
          var container = document.getElementById('bloom_timeline');
          var graphData = bloomService.loadBloomGraphData($scope.blooms, year);
          var timeline = new vis.Timeline(container, graphData.data, graphData.options);
        }

        var sprayPage = 0;
        $scope.sprayed = [];
        $scope.getMoreSprayed = function(){
          sprayPage++;
          SprayedFactory.getPestByPlantID($scope.plant.id, sprayPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.sprayedMoreShow = false;
            }
            for(var i = 0; i < data.length; i++){
              $scope.sprayed.push(data[i]);
            }
          })
        }
        $scope.getMoreSprayed();

        var repotPage = 0;
        $scope.repotted = [];
        $scope.getMoreRepotted = function(){
          repotPage++;
          PottingFactory.getBloomByPlantID($scope.plant.id, repotPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.repottedMoreShow = false;
            }
            for(var i = 0; i < data.length; i++){
              $scope.repotted.push(data[i]);
            }
          })
        }
        $scope.getMoreRepotted();

        var healthPage = 0;
        $scope.healthData = [];
        $scope.getMoreHealth = function(){
          healthPage++;
          HealthFactory.getHealthBtPlantID($scope.plant.id, healthPage).then(function(response){
            var data = response.data.data;
            if(data.length < 5){
              $scope.healthMoreShow = false;
            }
            for(var i = 0; i < response.data.data.length; i++){
              $scope.healthData.push(response.data.data[i]);
            }
          })
        }
        $scope.getMoreHealth();

        splitFactory.getSplitForPlantId($scope.plant.id).then(function(response) {
            for (var i = 0; i < response.data.data.length; i++) {
                var timestamp = new Date(response.data.data[i].timestamp);
                response.data.data[i].timestamp = timestamp;
                $scope.splits.push(response.data.data[i]);
            }
        });

        PlantCountryLinkFactory.getCountryByPlantID($scope.plant.id).then(function(response) {
            if(response.data.data != undefined){

                for (var i = 0; i < response.data.data.length; i++) {
                    $scope.selectedCountries.push(response.data.data[i][0]);
                }

                for (var i = 0; i < response.data.data.length; i++) {
                    $scope.origianlSelectedCountries.push(response.data.data[i][0]);
                }

            }
        }, function (error){
            console.log("There is an error getting the countries");
        });

        countryFactory.getCountries().then(function(response) {
            $scope.allCountires = [];
            var countryNames = response.data.data;

            for (var i = 0; i < countryNames.length; i++) {
                if (countryHasPlant(countryNames[i]) === false) {
                    $scope.allCountires.push(countryNames[i]);

                }
            }
        });

        //todo need to look at why this is not pulling in the correct image
        PhotoFactory.getPhtosByPlantID($scope.plant.id).then(function(response) {
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
                        $scope.plant_id_url.push(response.data.data[i]);

                        if (data[i].type == "habitat") {
                            $scope.habitatPictures.push(data[i]);

                        } else if (data[i].type == "other") {

                            $scope.otherPictures = data[i].id;

                        }

                    }
                }

            }


        });
    }, function(error) {
        var param1 = $routeParams.accession_number;
        if (param1 == "create") {
            $scope.createNew = true;
            $scope.plant = {
                image: 'images/no_plant_icon.svg'
            };

            LocationFactory.getTableLocations().then(function(response) {
                var tableData = response.data.data;
                for (i = 0; i < tableData.length; i++) {
                    $scope.Tables.push(tableData[i]);
                }
                $scope.Tables = _.sortBy($scope.Tables, ['name']);
            });

            countryFactory.getCountries().then(function(response) {
                var countryNames = response.data.data;
                $scope.example1data = [];
            });

        } else {
            $location.path('/404');
        }

    });

    var createDateFromString = function(string){
      return moment(string).toDate();
    };

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
            split: false,
            speical_collections: false,
            notes: false
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
            split: true,
            speical_collections: true,
            notes: true
        };
    }

    $scope.loadSpecialCollection = function(id){
        if($scope.plant.special_collections_id == undefined){

        } else {
            SpecialCollectionsFactory.getSpecialCollectionById($scope.plant.special_collections_id).then(function (response) {
                $scope.selectedCollectionName = response.data.data.name;

            });
        }
    };

    $scope.newCollectionName = "";

    $scope.createNewCollection = function(){
        if($scope.newCollectionName == ""){
            //DO NOTHING SINCE IT IS EMPTY
        } else {
            var newCollection = {
                "name" : $scope.newCollectionName
            };

            SpecialCollectionsFactory.createSpecialCollection(newCollection).then(function (response){
                //TODO maybe look at display a note say that is was created
                $scope.allCollections.push(response.data.data[0]);
            });
            $scope.selectedCollectionName = $scope.newCollectionName;
            $scope.newCollectionName = "";

            SpecialCollectionsFactory.getAllSpecialCollections().then(function(response){
                var responseAllCollections = response.data.data;
                for(var i = 0; i < responseAllCollections.length; i++){
                    $scope.allCollections.push(responseAllCollections[i]);
                }

            });

        }

    }

    $scope.editSpecialCollections = function(){
        if ($scope.editPlant.speical_collections == false) {
            $scope.editPlant.speical_collections = true;

            var speicalCollectionRelationshipData = {
                'id' :  $scope.plant.id,
                'name' : $scope.selectedCollectionName
            };

            PlantsFactory.updateCollection(speicalCollectionRelationshipData).then(function(response){
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });


        } else {
            $scope.editPlant.speical_collections = false;
        }
    };

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

    $scope.collectionID = "NULL";
    $scope.tableID = 0;
    $scope.tableError = false;
    $scope.accessionError = false;
     var promArray = [];
    var promArray2 = [];

    $scope.saveAll = function() {

        $scope.AccessionHasBeenChecked = false;

        //DETERMINE IF THE TABLE IS EMPT
        if ($scope.plantLocation == "" || $scope.plantLocation == undefined ){
            $scope.tableError = true;
        } else {
            $scope.tableError = false;
        }

        if ($scope.plant.accession_number == undefined || $scope.plant.accession_number == ""){
            $scope.accessionError = true;
            if($scope.accessionError == true && $scope.tableError == true){
                window.alert("Accession Error. (1)Please enter a valid accession number.");
                window.alert("Table Error. (1)Please select a valid table");
            }else{
                if($scope.accessionError == true){
                    window.alert("Accession Error. (1)Please enter a valid accession number.");
                }
                if($scope.tableError == true){
                    window.alert("Table Error. (1)Please select a valid table");
                }
            }
        } else {

            var prom = new Promise(function(resolve, reject) {
                PlantsFactory.checkAccessionNumber($scope.plant.accession_number).then(function (response){
                    var accessionResponse = response.data.data;
                    resolve(accessionResponse);
                }, function(error){
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
            });

            promArray.push(prom);

            Promise.all(promArray).then(function (success) {

                var updateList = [];

                for (var i = 0; i < success.length; i++){
                    if (success[i] != ""){
                        updateList.push(success[i][0]);
                    }
                }

                var value = updateList[((updateList.length)-1)];
                if(value == true){
                    $scope.accessionError = true;
                }  else {
                    $scope.accessionError = false;
                }

                $scope.$apply();

                promArray = [];

                //Checking the status of the errors.
                $scope.AccessionHasBeenChecked = true;

                if($scope.accessionError == true || $scope.tableError == true) {
                    if($scope.tableError == true && $scope.accessionError == true){
                        window.alert("Accession Error. (1)Please enter a valid accession number.");
                        window.alert("Table Error. (1)Please select a valid table");
                    }
                    else if($scope.tableError == true){
                        window.alert("Table Error. (1)Please select a valid table");
                    } else if($scope.accessionError == true){
                        window.alert("Accession Error. (1)Please enter a valid accession number.");
                    }
                    $scope.accessionError = false;
                    $scope.tableError = false;
                } else {
                    if ($scope.AccessionHasBeenChecked == true){
                        $scope.continueForwaring();
                    } else {
                        window.alert("Error. Please try again.")
                    }
                }
            }, function (error) {
            });
        }
    };

    $scope.continueForwaring = function(){

        //Getting the collection ID or setting it to null
        if($scope.selectedCollectionName == ""){
            //SETTING THE COLLECTION ID TO NOTHING SINCE THERE IS NONE
            $scope.collectionID = null;
        } else {
            //GETTING THE CORRECT ID FOR THE COLLECTIONS
            for(var i = 0; i < $scope.allCollections.length; i++){
                if($scope.selectedCollectionName == $scope.allCollections[i].name){
                    $scope.collectionID = $scope.allCollections[i].id;
                    break;
                }
            }
        }

        //Getting the table ID
        for(var i = 0; i < $scope.Tables.length; i++){
            if($scope.plantLocation == $scope.Tables[i].name){
                $scope.tableID = $scope.Tables[i].id;
                $scope.tableError == false;
                break;
            }
        }

        var date_recieved_object;
        if($scope.plant.date_recieved == null){
            date_recieved_object = null;
        } else {
            date_recieved_object = $scope.plant.date_recieved;
        }

        checkData();

        var data = {
            "accession_number" : $scope.plant.accession_number,
            "name" : $scope.plant.name,
            "scientific_name" : $scope.plant.scientific_name,
            "class_name" : $scope.plant.class,
            "tribe_name" : $scope.plant.tribe,
            "subtribe_name" : $scope.plant.subtribe,
            "genus_name" : $scope.plant.genus,
            "distribution" : $scope.plant.distribution,
            "variety_name" : $scope.plant.variety,
            "authority" : $scope.plant.authority,
            "species_name" : $scope.plant.species,
            "habitat" : $scope.plant.habitat,
            "origin_comment" : $scope.plant.origin_comment,
            "received_from" : $scope.plant.received_from,
            "donation_comment": $scope.plant.donation_comment,
            "date_received": date_recieved_object,
            "description": $scope.plant.description,
            "parent_one": $scope.plant.parent_one,
            "parent_two" : $scope.plant.parent_two,
            "grex_status" : $scope.plant.grex_status,
            "hybrid_comment" : $scope.plant.hybrid_comment,
            "location_id" : $scope.tableID,
            "special_collections_id" : $scope.collectionID,
            "general_note": $scope.plant.general_note,
            "phylum_name": $scope.plant.phylum,
            "countries_note" : $scope.plant.countries_note
        };

        var plant = {
            "data" : data
        };
        var prom2 = new Promise(function(resolve, reject) {
            PlantsFactory.createNew(plant).then(function(response){
                var newPlantInfo = response.data.data;
                resolve(newPlantInfo);
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });
        });

        promArray2.push(prom2);
        Promise.all(promArray2).then(function (success) {
            console.log(success);
            var updateList = [];
            for (var i = 0; i < success.length; i++){
                if (success[i] != ""){
                    $scope.newPlantID = success[i].id;
                    $scope.newAcceessionNumer = success[i].accession_number;
                }
            }

            $scope.createNewPlantCountryLink();

            $scope.$apply();

        }, function (error) {

        });

    };

    $scope.createNewPlantCountryLink = function(){
        for(var i = 0; i < $scope.selectedCountries.length; i++){
          console.log('derp');
            var p_c_link = {
                'plant_id' : $scope.newPlantID,
                'country_id': $scope.selectedCountries[i].id
            };
            PlantCountryLinkFactory.createPlantCountryLink(p_c_link).then(function(response){
            })
        }
        $scope.forwardToPage();


    };

    //PUTS UNDEFINDS TO STRINGS
    function checkData(){

        if($scope.plant.scientific_name == undefined){
            $scope.plant.scientific_name = "";
        }
        if($scope.plant.name == undefined){
            $scope.plant.name = "";
        }
        if($scope.plant.class == undefined){
            $scope.plant.class = "";
        }

        if($scope.plant.tribe == undefined){
            $scope.plant.tribe = "";
        }

        if($scope.plant.species == undefined){
            $scope.plant.species = "";
        }
        if($scope.plant.authority == undefined){
            $scope.plant.authority = "";
        }
        if($scope.plant.variety == undefined){
            $scope.plant.variety = "";
        }

        if($scope.plant.subtribe == undefined){
            $scope.plant.subtribe = "";
        }

        if($scope.plant.genus == undefined){
            $scope.plant.genus = "";
        }
        if($scope.plant.distribution == undefined){
            $scope.plant.distribution = "";
        }

        if($scope.plant.habitat == undefined){
            $scope.plant.habitat = "";
        }

        if($scope.plant.origin_comment == undefined){
            $scope.plant.origin_comment = "";
        }
        if($scope.plant.received_from == undefined){
            $scope.plant.received_from = "";
        }
        if($scope.plant.donation_comment == undefined){
            $scope.plant.donation_comment = "";
        }

        if($scope.plant.description == undefined){
            $scope.plant.description = "";
        }
        if($scope.plant.parent_one == undefined){
            $scope.plant.parent_one = "";
        }
        if($scope.plant.parent_two == undefined){
            $scope.plant.parent_two = "";
        }
        if($scope.plant.grex_status == undefined){
            $scope.plant.grex_status = "";
        }
        if($scope.plant.hybrid_comment == undefined){
            $scope.plant.hybrid_comment = "";
        }
        if($scope.plant.general_note == undefined){
            $scope.plant.general_note = "";
        }
        if($scope.plant.phylum == undefined){
            $scope.plant.phylum = "";
        }
        if($scope.plant.countries_note == undefined){
            $scope.plant.countries_note = "";
        }
    }

    $scope.forwardToPage = function(){
        $location.path('/plant/' + $scope.newAcceessionNumer);
        $route.reload();
        $scope.scrollToFunction();
    };

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

        for (var i = 0; i < $scope.deleteList.length; i++) {
            if ($scope.deleteList[i].id == photo.id) {
                //they are matching
                DValue = true;
                break;
            }
        }

        if (DValue == false) {

            var lengthList = $scope.deleteList.length;
            $scope.deleteList[lengthList] = photo;
        }


        for (var i = 0; i < $scope.otherList.length; i++) {

            if ($scope.otherList[i].id == photo.id) {
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
            var promArray = [];

            for (var i = 0; i < $scope.deletedPictures.length; i++) {
                var deleteInfo = {
                    id: $scope.deletedPictures[i].id,
                    plant_id: $scope.deletedPictures[i].plant_id,
                    url: $scope.deletedPictures[i].url,
                    type: $scope.deletedPictures[i].type
                };

                var prom = new Promise(function(resolve, reject) {
                    PhotoFactory.deletePhoto(deleteInfo).then(function(response) {
                        var photoResponse = response.data.data;
                        resolve(photoResponse);
                    });
                });

                promArray.push(prom);
            }

            for (var i = 0; i < $scope.newHabitatList.length; i++) {
                var habitatInfo = {
                    id: $scope.newHabitatList[i].id,
                    plant_id: $scope.newHabitatList[i].plant_id,
                    url: $scope.newHabitatList[i].url,
                    type: "habitat",
                    fileName: $scope.newHabitatList[i].fileName
                };


                var prom = new Promise(function(resolve, reject) {
                    PhotoFactory.updatePhoto(habitatInfo).then(function(response) {
                        var photoResponse = response.data.data;
                        resolve(photoResponse);
                    });
                });

                promArray.push(prom);
            }




            for (var i = 0; i < $scope.otherList.length; i++) {

                var otherInformation = {
                    id: $scope.otherList[i].id,
                    plant_id: $scope.otherList[i].plant_id,
                    url: $scope.otherList[i].url,
                    fileName: $scope.otherList[i].fileName,
                    type: "other"
                };



                var prom = new Promise(function(resolve, reject) {
                    PhotoFactory.updatePhoto(otherInformation).then(function(response) {
                        var photoResponse = response.data.data;
                        resolve(photoResponse);
                    });
                });

                promArray.push(prom);
            }


            if ($scope.theSelectedProfilePicture.id != "" || scope.theSelectedProfilePicture.id == undefined){

                if($scope.theSelectedProfilePicture.id != undefined){
                    var profile = {
                        id: $scope.theSelectedProfilePicture.id,
                        plant_id: $scope.theSelectedProfilePicture.plant_id,
                        url: $scope.theSelectedProfilePicture.url,
                        fileName: $scope.theSelectedProfilePicture.fileName,
                        type: "profile"
                    };

                    var prom = new Promise(function(resolve, reject) {

                        PhotoFactory.updatePhoto(profile).then(function(response) {
                            var photoResponse = response.data.data;
                            resolve(photoResponse);
                        });
                    });
                    promArray.push(prom);
                }

            } else {
            }

            Promise.all(promArray).then(function (success) {
                $scope.$apply();

                $route.reload();
            }, function (error) {


            });

        } else {
            $scope.editPlant.photos = false;
        }
    };



    $scope.newSplit = false;
    $scope.newPlantSplits = [];
    $scope.addPlantSplitFunction = function(donation) {
        $scope.newSplit = true;
        if(donation){
            $scope.donationSet();
        }
        $scope.newPlantSplit
    };

    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;

            var taxonmicPlantInformation = {
                phylum_name: $scope.plant.phylum,
                class_name: $scope.plant.class,
                tribe_name: $scope.plant.tribe,
                subtribe_name: $scope.plant.subtribe,
                genus_name: $scope.plant.genus,
                species_name: $scope.plant.species,
                variety_name: $scope.plant.variety,
                authority: $scope.plant.authority,
                id: $scope.plant.id
            };

            console.log(taxonmicPlantInformation);

            PlantsFactory.editTaxonmicPlant(taxonmicPlantInformation).then(function(response) {

            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            $scope.editPlant.taxonommy = false;
        }
    };

    $scope.donationSet = function() {
        $scope.donation = !$scope.donation;
    }

    $scope.donation = false;
    $scope.editSplit = function() {
        if ($scope.editPlant.split == false) {
                console.log($scope.newPlantSplit.recipient);
                console.log($scope.newPlantSplit.timestamp);

                if ($scope.newPlantSplit.recipient == "" || !$scope.newPlantSplit.timestamp == undefined) {
                    window.alert("Error creating Split");
                } else {
                    var plantSplit = {
                        'recipient': $scope.newPlantSplit.recipient,
                        'timestamp': $scope.newPlantSplit.timestamp,
                        'note' : $scope.newPlantSplit.note
                    };

                    splitFactory.createNewSplit(plantSplit, $scope.plant.id).then(function (response) {
                        if($scope.donation){
                            splitFactory.addLetter($scope.plant.id).then(function(response){

                            });
                        } else {
                            splitFactory.makeDonation($scope.plant.id).then(function(response){

                            })
                        }
                    });

                    for (var i = 0; i < $scope.splits.length; i++) {
                        splitFactory.updateSplits($scope.splits[i], $scope.plant.id).then(function (response) {
                        });
                    }

                    $scope.editPlant.split = true;

                    $route.reload();
                }
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

            var dead_date_object;
            var inactive_date_object;

            var dateError = false;

            if($scope.plant.dead_date == null){
                dead_date_object = null;
            } else {
                dead_date_object = new Date($scope.plant.dead_date);
                if(String(dead_date_object.getFullYear()).length > 4 || (dead_date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {
                    console.log(String(dead_date_object.getFullYear()).length);

                }


            }

            if($scope.plant.inactive_date == null){
                inactive_date_object = null;
            } else {
                inactive_date_object = new Date($scope.plant.inactive_date);
                if(String(inactive_date_object.getFullYear()).length > 4 || (inactive_date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {
                    console.log(inactive_date_object.getFullYear().length);
                }
            }

            if ( dateError == true) {
                window.alert('Date is not in the correct format.');
            } else {


                var inactiveInformation = {
                    dead_date: dead_date_object,
                    inactive_date: inactive_date_object,
                    inactive_comment: $scope.plant.inactive_comment,
                    id: $scope.plant.id
                };

                PlantsFactory.editInactivePlant(inactiveInformation).then(function (response) {

                }, function (error) {
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
                $scope.editPlant.inactive = true;

            }

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
        PlantsFactory.createNewPlant(criticalPlantInformation).then(function(response) {

            $scope.plant.id = response.data.data.id;
            $scope.accession_number = response.data.data.accession_number;
            $scope.editTaxonomy();
            $scope.editCulture();
            $scope.editDescription();
            $scope.editHybrid();
            $scope.editInactive();
            $scope.editAccession();
            var x = $scope.accession_number;
            $location.path('/plant/' + x);
        }, function(error){
            window.alert('Network Error. Please try again.');
            $location.path('/');
        });

    };

    $scope.profilePopUp = false;

    $scope.changeProfilePicture = function() {
        if ($scope.editPlant.photos == false) {
            $scope.profilePopUp = !$scope.profilePopUp;

            $rootScope.$broadcast('abc', {
                any: {
                    'accession_number': $scope.plant.accession_number,
                    'plant_id' : $scope.plant.id
                }
            });

            $scope.$on('photoMatcher', function(event, data) {
                if (data == true) {
                    $scope.profilePopUp = true;
                }
                if (data == false){
                    $scope.profilePopUp = false;

                }
            });
        } else {
            //Do nothing since the section is not editable
        }
    };



    $scope.editCritical = function() {
        $scope.checkedTable = false;
        if ($scope.editPlant.critical == false) {

            for(var i = 0; i < $scope.Tables.length; i++){
                if($scope.plantLocation == $scope.Tables[i].name){
                    $scope.tableID = $scope.Tables[i].id;
                    $scope.checkedTable = true;
                    break;
                } else {
                    $scope.checkedTable = false;
                }
            }

            if($scope.checkedTable == false){
                window.alert("Please select a table from the list.");
            } else {
                var criticalPlantInformation = {
                    scientific_name: $scope.plant.scientific_name,
                    name: $scope.plant.name,
                    location_id: $scope.tableID,
                    id: $scope.plant.id,
                    accession_number: $scope.plant.accession_number
                };
                PlantsFactory.editCriticalPlant(criticalPlantInformation).then(function (response) {
                }, function(error){
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });

                var dataAsString = createDateFromString($scope.verifiedObject.verified_data);

                if (dataAsString == $scope.verifiedDate || $scope.verifiedDate == undefined) {
                    $scope.editPlant.critical = true;
                }
                else if(dateIsFuture($scope.verifiedDate)){ 
                   alert("Verify date cannot be set in the future."); 
                }
                else {
                    if($scope.isVerified == true) {
                        var newDateFromModel = new Date($scope.verifiedDate);
                        var verifiedInformation = {
                            plant_id: $scope.plant.id,
                            verified_date: newDateFromModel,
                            id: $scope.verifiedObject.id,
                            active: 1
                        };

                        VerifiedFactory.updateVerified(verifiedInformation).then(function (response) {

                        });
                        $scope.editPlant.critical = true;

                    } else {
                        var newDateFromModel = new Date($scope.verifiedDate);
                        var verifiedSpecificInformation = {
                            plant_id: $scope.plant.id,
                            verified_date: newDateFromModel
                        };
                        VerifiedFactory.createSpecifcVerifiedDate(verifiedSpecificInformation).then(function (response){
                        });
                        $scope.editPlant.critical = true;
                    }
                }
            }

        } else {
            $scope.editPlant.critical = false;
        }
    };

    var dateIsFuture = function(string){ 
        var verifyDate = moment(string); 
        var today = new Date(); 
        if (verifyDate.isAfter(today)) { 
            return true; 
        } else { 
            return false; 
        } 
    };

    $scope.deleteCountryList = [];
    $scope.addCountryList = [];

    $scope.editCulture = function() {
        if ($scope.editPlant.culture == false) {
            // Update the record
            $scope.editPlant.culture = true;


            var culturePlantInformation = {
                distribution: $scope.plant.distribution,
                habitat: $scope.plant.habitat,
                location_id: 3,
                id: $scope.plant.id,
                origin_comment: $scope.plant.origin_comment,
                countries_note: $scope.plant.countries_note
            };

                        console.log(culturePlantInformation);

            var alreadyAdded = false;


            for(var i = 0; i < $scope.selectedCountries.length; i++){
                var country = $scope.selectedCountries[i];
                alreadyAdded = false;
                for(var j = 0; j < $scope.origianlSelectedCountries.length; j++){
                    if($scope.selectedCountries[i].name == $scope.origianlSelectedCountries[j].name){
                        alreadyAdded = true;
                        break;
                    }
                }

                if(alreadyAdded == false){
                    $scope.addCountryList.push(country);
                }
            }

            var alreadyTaken = false;
            for(var i = 0; i < $scope.origianlSelectedCountries.length; i++){
                var country = $scope.origianlSelectedCountries[i];
                alreadyTaken = false;
                for(var j = 0; j < $scope.selectedCountries.length; j++){
                    if($scope.origianlSelectedCountries[i].name == $scope.selectedCountries[j].name){
                        alreadyTaken = true;
                        break;
                    }

                }

                if(alreadyTaken == false){

                    $scope.deleteCountryList.push(country);
                }
            }

            for(var i = 0; i < $scope.addCountryList.length; i++){
                var p_c_link = {
                    'plant_id' : $scope.plant.id,
                    'country_id': $scope.addCountryList[i].id
                }
                PlantCountryLinkFactory.createPlantCountryLink(p_c_link).then(function(response){

                })
            }

            for(var i = 0; i < $scope.deleteCountryList.length; i++){
                var p_c_link = {
                    'plant_id' : $scope.plant.id,
                    'country_id': $scope.deleteCountryList[i].id
                }
                PlantCountryLinkFactory.deleteRelationship(p_c_link).then(function(response){

                });
            }

            PlantsFactory.editCulturePlant(culturePlantInformation).then(function() {

            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            //change the state of the button
            $scope.editPlant.culture = false;
        }
    }

    $scope.editAccession = function() {
        if ($scope.editPlant.accesssion == false) {

            var date_object;
            var dateError = false;

            if($scope.plant.date_recieved == null){
                date_object = null;
            } else {
                date_object = new Date($scope.plant.date_recieved);
                if(String(date_object.getFullYear()).length > 4 || (date_object.getFullYear()) < 1990){
                    dateError = true;
                } else {

                }
            }


            if(dateError == false){
                var accessionPlantInformation = {
                    received_from: $scope.plant.received_from,
                    donation_comment: $scope.plant.donation_comment,
                    date_received: date_object,
                    id: $scope.plant.id
                }

                PlantsFactory.editAccessionPlant(accessionPlantInformation).then(function (response) {

                }, function (error) {
                    window.alert('Network Error. Please try again.');
                    $location.path('/');
                });
                $scope.editPlant.accesssion = true;
            } else {
                window.alert('Date is not in the correct format.');
            }
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
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
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
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });
        } else {
            $scope.editPlant.hybrid = false;

        }
    };

    $scope.editGeneralNote = function() {
        if ($scope.editPlant.notes == false) {
            $scope.editPlant.notes = true;

            var generalNotesInformation = {
                general_note: $scope.plant.general_note,
                id: $scope.plant.id
            };

            PlantsFactory.updateGeneralNotes(generalNotesInformation).then(function(response) {
            }, function(error){
                window.alert('Network Error. Please try again.');
                $location.path('/');
            });

        } else {
            $scope.editPlant.notes = false;

        }
    };

    $scope.click = function() {
    }


    $scope.showMoveFunction = function() {
        $scope.showPopup2 = !$scope.showPopup2;
    };

    $scope.addPhotoList = [];

    $scope.newPhotoLink = function (photo){

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

        //$scope.$apply();
    };

    $scope.profileSelected = function(photo) {
        if (photo.id == $scope.theSelectedProfilePicture.id) {
            //stays the same
        } else {

            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.theSelectedProfilePicture.id == $scope.plant_id_url[i].id){
                    var oldPhoto = $scope.plant_id_url[i];
                    $scope.plant_id_url[i].type = 'habitat';
                    $scope.newHabitatList.push(oldPhoto);
                    break;
                } else {

                }
            }
            photo.type = 'profile';
            $scope.theSelectedProfilePicture = photo;
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
        if(noChange == false) {
            //we need to made a change
            for (var i = 0; i < $scope.plant_id_url.length; i++) {
                if ($scope.plant_id_url[i].id == photo.id) {
                    var index = i;
                    break;
                }
            }

            $scope.otherList.push(photo);
            $scope.plant_id_url[index].type = 'other';
            for (var j = 0; j < $scope.newHabitatList.length; j++) {
                if (photo.id == $scope.newHabitatList[j].id) {
                    $scope.newHabitatList.splice(j, 1);
                    break;
                }
            }
            if (photo.id == $scope.theSelectedProfilePicture.id) {
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

            //seeing if it is in the habitiat list
            for(var j = 0; j < $scope.newHabitatList.length; j++){
                if(photo.id == $scope.newHabitatList[j].id){
                    $scope.newHabitatList.splice(j, 1);
                    break;
                }
            }

            //seeing if it is in the other list
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
        for (var i = 0; i < $scope.newHabitatList.length; i++){
            if(photo.id == $scope.newHabitatList[i].id){
                //do nothing since it is already there
                noChange = true;
            }
        }
        if(noChange == false){
            //we need to made a change
            var index;
            for (var i = 0; i < $scope.plant_id_url.length; i++){
                if ($scope.plant_id_url[i].id == photo.id){
                    index = i;
                    break;
                }
            }

            $scope.newHabitatList.push(photo);
            $scope.plant_id_url[index].type = 'habitat';

            //seeing if it is in the other list
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

    $scope.deleteSpecialCollection = function(){

        if($scope.selectedSpecialCollectionDeletedName == ""){

            window.alert("No Special Collection to delete");
        } else {
            console.log($scope.selectedSpecialCollectionDeletedName);
            SpecialCollectionsFactory.deleteSpecialCollection($scope.selectedSpecialCollectionDeletedName).then(function (response){
                console.log(response);
                if(response.data.data[0] == true){
                    $route.reload();
                } else {
                    window.alert('Error with Deleting Special Collections');
                }
                console.log(response);
            }, function (error) {
                window.alert('Network Error.');
            });
        }
    };

    $scope.changeSpecialColelctionDelete = function(name){
        if(name == "Delete Collection"){
            $scope.collectionWarning = false;
        } else {
            $scope.collectionWarning = true;
        }
    };

    $scope.uploadFileUrl = function(url, b, thumbnailURL){
        var baseURL = "http://s3.amazonaws.com/bsuorchid/";
        var thumb_nail = thumbnailURL.split(baseURL)[1];

        var fileName = url.split(baseURL)[1];
        var photo = {
          'plant_id' : $scope.plant.id,
            'url' : url,
            'type' : 'habitat',
            'fileName' : fileName,
            'thumb_url' : thumbnailURL
        };

        PhotoFactory.createPhoto(photo).then(function (response){
            $scope.editPlant.photos = true;
            $scope.plant_id_url.push(data);
        });


        $route.reload();

    }

    $scope.scrollToFunction = function(){
        $(window).scrollTop(0);
    }
    $scope.autoFilledClasses = [];
    $scope.autoFilledPhylums = [];
    $scope.autoFilledGenuses = [];
    $scope.autoFilledTribes = [];
    $scope.autoFilledSpecies = [];
    $scope.autoFilledSubtribes = [];
    $scope.autoFilledVarieties = [];
    $scope.autoFilledAuthorities = [];

    $scope.autoFillClass = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('class', text).then(function(response) {
          $scope.autoFilledClasses = response.map(function(classObj) {
            return classObj.class_name;
          });
        });
      }
    }


    $scope.autoFillPhylum = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('phylum', text).then(function(response) {
          $scope.autoFilledPhylums = response.map(function(classObj) {
            return classObj.phylum_name;
          });
        });
      }
    }


    $scope.autoFillGenus = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('genus', text).then(function(response) {
          $scope.autoFilledGenuses = response.map(function(classObj) {
            return classObj.genus_name;
          });
        });
      }
    }

    $scope.autoFillTribe = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('tribe', text).then(function(response) {
          $scope.autoFilledTribes = response.map(function(classObj) {
            return classObj.tribe_name;
          });
        });
      }
    }

    $scope.autoFillSpecies = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('species', text).then(function(response) {
          $scope.autoFilledSpecies = response.map(function(classObj) {
            return classObj.species_name;
          });
        });
      }
    }

    $scope.autoFillSubtribe = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('subtribe', text).then(function(response) {
          $scope.autoFilledSubtribes = response.map(function(classObj) {
            return classObj.subtribe_name;
          });
        });
      }
    }

    $scope.autoFillVariety = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('variety', text).then(function(response) {
          $scope.autoFilledVarieties = response.map(function(classObj) {
            return classObj.variety_name;
          });
        });
      }
    }

    $scope.autoFillAuthority = function(text) {
      if (text !== "" && text !== undefined && text !== null) {
        taxonommyFactory.getAutoFillTaxonomy('authority', text).then(function(response) {
          $scope.autoFilledAuthorities = response.map(function(classObj) {
            return classObj.authority;
          });
        });
      }
    }
});
