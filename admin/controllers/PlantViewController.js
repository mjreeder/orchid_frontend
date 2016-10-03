app.controller('PlantViewController', function($scope, CONFIG, countryFactory, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, TagFactory, $location, PlantCountryLinkFactory) {

    var param1 = $routeParams.accession_number;

    console.log(param1);
    classificationLinkFactory.getPlantHierarchy(1).then(function (response){
        console.log(response.data.data);
    });



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
    $scope.Tables = []



    PlantsFactory.getPlantByAccessionNumber(param1).then(function (response){
       var plantData = response.data.data[0];
        console.log(plantData);
        var plant_id = response.data.data[0].id;

        country = [];

        LocationFactory.getTableLocations().then(function (response){
            var tableData = response.data.data;

            for (i = 0; i < tableData.length; i++){

                $scope.Tables.push(tableData[i].name);
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

        //classificationLinkFactory.getPlantHierarchy(1).then (function (response){
        //   console.log(response.data.data);
        //    var classificationPlantData = response.data.data
        //    //console.log(classificationPlantData[0].class_id);
        //    length = classificationPlantData.length;
        //    for (a = 0; i <= 3; a++){
        //
        //        //var scientific_name = classificationPlantData[a].scientific_class_name;
        //        var type_name = classificationPlantData[a];
        //
        //        console.log(type_name.getElementsByClassName("scientific_class_name"));
        //        //console.log(scientific_name);
        //
        //        a = [];
        //        a.push( type_name);
        //        newLink.push(a);
        //    }
        //
        //
        //});
        //console.log("helllo");
        //
        //console.log(newLink);




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
            aaa: new Date(2014, 02, 03)
        };

        LocationFactory.getTableNameFromID($scope.plant.location_id).then(function (response){
            $scope.plant.locationName = response.data.data.name;
        });

        console.log($scope.plant.aaa);





    }, function(error){
        console.log("there is an erorr");
        $location.path('/404');
    });



    $scope.editPlant = {
        critical: false,
        taxonommy:false,
        culture:false,
        accesssion:false,
        hybrid:false,
        inactive:false,
        photos: false

    }

    $scope.saveCulture = {
        taxonommy:false,
        culture:false,
        accesssion:false,
        hybrid:false
    }

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
    }

    $scope.editPhotos = function() {
        if ($scope.editPlant.photos == false){
            $scope.editPlant.photos = true;


        } else {
            $scope.editPlant.photos = false;
        }
    }

    $scope.editTaxonomy = function() {
        if ($scope.editPlant.taxonommy == false) {
            $scope.editPlant.taxonommy = true;
        } else {
            $scope.editPlant.taxonommy = false;
        }
    }

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

        } else {
            $scope.editPlant.critical = false;

            var criticalPlantInformation = {scientific_name: $scope.plant.scientific_name, name:$scope.plant.name, location_id: $scope.plant.location_id, id:$scope.plant.id, accession_number:$scope.plant.accession_number};

            PlantsFactory.editCriticalPlant(criticalPlantInformation).then(function (response){
                console.log(response.data);
            });
        }
    }


    $scope.editCulture = function() {
      if ($scope.editPlant.culture == false) {
          $scope.editPlant.culture = true;
      } else {
          $scope.editPlant.culture = false;


          var culturePlantInformation = {distribution: $scope.plant.distribution, habitat:$scope.plant.habitat, location_id: 3, id:$scope.plant.id, origin_comment:$scope.plant.origin_comment};

          PlantsFactory.editCulturePlant(culturePlantInformation).then(function (response){
              console.log(response.data);
          });





      }
    }

    $scope.editAccession = function () {
      if ($scope.editPlant.accesssion == false) {
          $scope.editPlant.accesssion = true;
      } else {
          $scope.editPlant.accesssion = false;

          var accessionPlantInformation = {recieved_from: $scope.plant.received_from, donation_comment: $scope.plant.donation_comment, id: $scope.plant.id }

          PlantsFactory.editAccessionPlant(accessionPlantInformation).then(function (response){
             console.log(response.data);
          });
      }
    }

    $scope.editDescription = function () {
      if ($scope.editPlant.description == false) {
          $scope.editPlant.description = true;
      } else {
          $scope.editPlant.description = false;

          var descriptionPlantInformation = {description: $scope.plant.description, id: $scope.plant.id};

          PlantsFactory.editDescription(descriptionPlantInformation).then(function (response){
              console.log(response.data);
          });



      }
    }

    $scope.editHybrid = function () {
      if ($scope.editPlant.hybrid == false) {
          $scope.editPlant.hybrid = true;
      } else {
          $scope.editPlant.hybrid = false;

          var hybridPlantInformation = {parent_one: $scope.plant.parent_one, parent_two: $scope.plant.parent_two, grex_status: $scope.plant.grex_status, hybrid_comment: $scope.plant.hybrid_comment,  id: $scope.plant.id};

          PlantsFactory.editHybird(hybridPlantInformation).then(function (response){
              console.log(response.data);
          });

      }
    }







});
