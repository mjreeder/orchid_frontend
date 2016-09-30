app.controller('PlantViewController', function($scope, CONFIG, $routeParams, PlantsFactory, LocationFactory, classificationLinkFactory, TagFactory) {

    var param1 = $routeParams.accession_number;

    console.log(param1);
    classificationLinkFactory.getPlantHierarchy(1).then(function (response){
        console.log(response.data.data);
    });


    PlantsFactory.getPlantByAccessionNumber(param1).then(function (response){
       var data = response.data.data[0];
        //console.log(data);
        $scope.plant = {
            commonName: data.name,
            scientific_name: data.scientific_name,
            accession_number: data.accession_number,
            habitat: data.habitat,
            orginComment: data.orginComment,
            donatedTo: data.donatedTo,
            donnaitonComment: data.donation_comment,
            recieved: data.recieved,
            description: data.description,
            location_id: data.location_id



        };

        $scope.commonName = data.name;
        $scope.accession_number = data.accession_number;
        $scope.scientific_name = data.scientific_name;

        $scope.distribution = data.distribution;

        $scope.habitat = data.habitat;
        $scope.orginComment = data.orginComment;

        $scope.donatedTo = data.donatedTo;
        $scope.donationComment = data.donation_comment;
        $scope.recieved = data.recieved;

        $scope.description = data.description;

        $scope.parentOne = data.parent_one;
        $scope.parentTwo = data.parent_two;
        $scope.grex_status = data.grex_status;
        $scope.hybrid_status = data.hybrid_status;
        $scope.hybrid_comment = data.hybrid_comment;

        $scope.inactive = data.inactive;
        $scope.inactiveDate = data.inactive_date;



    });

    //LocationFactory.getTableLocations(function (response){
    //    var data = response.data.data;
    //
    //    console.log(data);
    //
    //});



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

            console.log($scope.plant);

            //var criticalData{
            //
            //    scientific_name: data.scientific_name,
            //       namea: "dd"
            //}

            console.log($scope.plant.scientific_name);
            var car = {scientific_name: $scope.plant.scientific_name, name:"500", location_id:2, id:1, accession_number:99998};

            PlantsFactory.editCriticalPlant(car).then(function (response){
                console.log(response.data);
            });
        }
    }


    $scope.editCulture = function() {
      if ($scope.editPlant.culture == false) {
          $scope.editPlant.culture = true;
      } else {
          $scope.editPlant.culture = false;
      }
    }

    $scope.editAccession = function () {
      if ($scope.editPlant.accesssion == false) {
          $scope.editPlant.accesssion = true;
      } else {
          $scope.editPlant.accesssion = false;
      }
    }

    $scope.editDescription = function () {
      if ($scope.editPlant.description == false) {
          $scope.editPlant.description = true;
      } else {
          $scope.editPlant.description = false;
      }
    }

    $scope.editHybrid = function () {
      if ($scope.editPlant.hybrid == false) {
          $scope.editPlant.hybrid = true;
      } else {
          $scope.editPlant.hybrid = false;
      }
    }







});
