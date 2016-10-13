app.controller('PlantViewController', function($scope, CONFIG, countryFactory, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, TagFactory, $location, PlantCountryLinkFactory) {

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

    $scope.CountryNames = [];
    $scope.Tables = [];
    //$scope.createNew = false;
    $scope.createNew;




    PlantsFactory.getPlantByAccessionNumber(param1).then(function (response){
       var plantData = response.data.data[0];
        console.log(plantData);
        var plant_id = response.data.data[0].id;

        country = [];

        LocationFactory.getTableLocations().then(function (response){
            var tableData = response.data.data;
            for (i = 0; i < tableData.length; i++){
                $scope.Tables.push(tableData[i]);

            }
        });

        PlantCountryLinkFactory.getCountryByPlantID(plant_id).then(function (response) {
            var plantCountryData = response.data.data;
            for (i = 0; i < plantCountryData.length; i++) {
                var nme = plantCountryData[i].name;
                console.log(nme);
                $scope.CountryNames.push(nme);
            }
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
            data_recieved: plantData.data_recieved,
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
            image: "http://placekitten.com/400/400"
        };

        LocationFactory.getTableNameFromID($scope.plant.location_id).then(function (response){
            $scope.plant.locationName = response.data.data;



        });

        console.log($scope.plant.aaa);

        $scope.createNew = false;

        console.log("aaaaa");




        classificationLinkFactory.getPlantHierarchy($scope.plant.id).then(function (response){
            console.log(response.data.data);
            var data = response.data.data;
            $scope.classification ={
                class: "",
                tribe: "",
                subtribe: "",
                genus: "",
                variety: "",
                species: ""
            };

            for (var i = 0; i < data.length; i++){
                var object = data[i];
                var classificationName = object.name;
                var scientificName = object.scientific_class_name;
                if (classificationName == "class"){
                    $scope.classification.class = scientificName;
                }
                if (classificationName == "tribe"){
                    $scope.classification.tribe = scientificName;
                }
                if (classificationName == "subtribe"){
                    $scope.classification.subtribe = scientificName;
                }

                if (classificationName == "genus"){
                    $scope.classification.genus = scientificName;
                }
                if (classificationName == "species"){
                    $scope.classification.species = scientificName;
                }
                if (classificationName == "variety"){
                    $scope.classification.variety = scientificName;
                }
                console.log($scope.classification);
            }
        });





    }, function(error){
        var param1 = $routeParams.accession_number;

        if (param1 == "create"){
            console.log("create is displayed");
            $scope.createNew = true;
            console.log();
            $scope.plant = {
                image: "http://downloadicons.net/sites/default/files/plus-icon-27951.png"
            };

            LocationFactory.getTableLocations().then(function (response){
                var tableData = response.data.data;
                for (i = 0; i < tableData.length; i++){
                    $scope.Tables.push(tableData[i]);
                }
            });

        }else {
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
            save: false

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
            save: true

        };



    }



    $scope.saveCulture = {
        taxonommy:false,
        culture:false,
        accesssion:false,
        hybrid:false
    };

    $scope.newPlant = {
      taxonomicRank:{
        class: '',
        tribe:'',
        authority:'',
        genus:'',
        species:'',
        variety:''
      },
      culture: {
        distribution: '',
        country: '',
        habitat:''
      },
      accesssion:{
        donatedTo:'',
        Recieved:'',
        dontationComment:''
      },
      description:'',
      hybrid:{
        parentOne:'',
        parentTwo:'',
        grex:''
      }
    };

    $scope.saveAll = function(){

    }

    $scope.editPhotos = function() {
        if ($scope.editPlant.photos == false){
            $scope.editPlant.photos = true;


        } else {
            $scope.editPlant.photos = false;
        }
    };

    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;

            var taxonmicPlantInformation = {class_name: $scope.plant.class, tribe_name: $scope.plant.tribe, subtribe_name: $scope.plant.subtribe, genus_name: $scope.plant.genus, species_name: $scope.plant.species, variety_name: $scope.plant.variety, id: $scope.plant.id}

            PlantsFactory.editTaxonmicPlant(taxonmicPlantInformation).then(function (response){
               console.log("done");
            });

        } else {
            $scope.editPlant.taxonommy = false;
        }
    };

    $scope.editInactive = function() {
        if ($scope.editPlant.inactive == false) {
            $scope.editPlant.inactive = true;
        } else {
            $scope.editPlant.inactive = false;
        }
    }

    $scope.editCritical = function(){
        if ($scope.editPlant.critical == false){
            $scope.editPlant.critical = true;


            var criticalPlantInformation = {scientific_name: $scope.plant.scientific_name, name:$scope.plant.name, location_id: $scope.plant.location_id, id:$scope.plant.id, accession_number:$scope.plant.accession_number};

            PlantsFactory.editCriticalPlant(criticalPlantInformation).then(function (response){
                console.log(response.data);
            });

            console.log($scope.plant.locationName);

            var criticalPlantTable = {name: $scope.plant.locationName.name ,id:$scope.plant.id}

            PlantsFactory.editCritialPlantTable(criticalPlantTable).then(function(response){
               console.log(response.data);
            });





        } else {
            $scope.editPlant.critical = false;


        }
    }


    $scope.editCulture = function() {
      if ($scope.editPlant.culture == false) {
          $scope.editPlant.culture = true;

          var culturePlantInformation = {distribution: $scope.plant.distribution, habitat:$scope.plant.habitat, location_id: 3, id:$scope.plant.id, origin_comment:$scope.plant.origin_comment};

          PlantsFactory.editCulturePlant(culturePlantInformation).then(function (response){
              console.log(response.data);
          });
      } else {
          $scope.editPlant.culture = false;
      }
    }

    $scope.editAccession = function () {
      if ($scope.editPlant.accesssion == false) {
          $scope.editPlant.accesssion = true;

          var accessionPlantInformation = {recieved_from: $scope.plant.received_from, donation_comment: $scope.plant.donation_comment, id: $scope.plant.id }

          PlantsFactory.editAccessionPlant(accessionPlantInformation).then(function (response){
              console.log(response.data);
          });
      } else {
          $scope.editPlant.accesssion = false;
      }
    }

    $scope.editDescription = function () {
      if ($scope.editPlant.description == false) {
          $scope.editPlant.description = true;
          var descriptionPlantInformation = {description: $scope.plant.description, id: $scope.plant.id};

          PlantsFactory.editDescription(descriptionPlantInformation).then(function (response){
              console.log(response.data);
          });
      } else {
          $scope.editPlant.description = false;
      }
    };

    $scope.editHybrid = function () {
      if ($scope.editPlant.hybrid == false) {
          $scope.editPlant.hybrid = true;

          var hybridPlantInformation = {parent_one: $scope.plant.parent_one, parent_two: $scope.plant.parent_two, grex_status: $scope.plant.grex_status, hybrid_comment: $scope.plant.hybrid_comment,  id: $scope.plant.id};

          PlantsFactory.editHybird(hybridPlantInformation).then(function (response){
              console.log(response.data);
          });
      } else {
          $scope.editPlant.hybrid = false;

      }
    }







});
