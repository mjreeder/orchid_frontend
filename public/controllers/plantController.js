orchidApp.controller('plantController', function($scope, $state, $stateParams, PlantsFactory, PhotoFactory, BloomingFactory, bloomService, $error) {

  $scope.accessionNum = $stateParams.accession_number;

  $scope.noPlant = false;
  $scope.plantInformation = "";
  $scope.photoInformation = [];
  $scope.url = "";
  $scope.plant = {};
  $scope.bloomYears = [];
  $scope.blooms = [];
  $scope.allimagesURL = [];
  $scope.bloomingMoreShow = true;

  $scope.haveProfilePicture = false;

  $scope.allimagesURL =[];

  $scope.profilePicture = "";

  PlantsFactory.getPlantByAccessionNumber($scope.accessionNum).then(function(response) {
    var data = response.data.data[0];
    $state.current.data.pageTitle = data.name ? data.name:'[No Title]';
    if (response.data.data[0] == false) {
      $scope.noPlant = false;
      //route to 404 if not found
      $state.go('404');
    } else {

      $scope.noPlant = true;
      $scope.plantInformation = response.data.data[0];

      //get plant blooms for bloom graph
      $scope.getMoreBlooms = function() {
        BloomingFactory.getAllBloomByPlantID($scope.plantInformation.id).then(function(response) {
          var data = response.data.data;
          for (var i = 0; i < data.length; i++) {
            $scope.blooms.push(data[i]);
            if (isInBloomYears(data[i]) == false) {
              $scope.bloomYears.push({
                "year": moment(data[i].start_date, "YYYY/MM/DD").year(),
                "dateObj": data[i].start_date
              })
            }
          }

          $scope.loadBloomGraph($scope.bloomYears[0]);
          for (var i = 0; i < $scope.blooms.length; i++) {
            if ($scope.blooms[i].end_date == "0000-00-00") {
              $scope.blooms[i].end_date = "present";
            }
          }
        }, function(error) {
          $error.handle(error);
        })
      }
      $scope.getMoreBlooms();
      $scope.createPlant();
    }
  }, function(error) {
      $error.handle(error);
  });

  //funtion to check if a year is the bloom years view list
  function isInBloomYears(year) {
    for (var i = 0; i < $scope.bloomYears.length; i++) {
      if ($scope.bloomYears[i].year == moment(year.start_date, "YYYY/MM/DD").year()) {
        return true;
      }
    }
    return false;
  }

  //scope function to display the bllom graph
  $scope.loadBloomGraph = function(year) {
    document.getElementById("bloom_timeline_spot").innerHTML = "";
    var container = document.getElementById('bloom_timeline_spot');
    for (var i = 0; i < $scope.bloomYears.length; i++) {
      var timeline = document.createElement("div");
      timeline.className = "bloom-timeline";
      var element = document.getElementById("bloom_timeline_spot");
      element.appendChild(timeline);
      var graphData = bloomService.loadBloomGraphData($scope.blooms, $scope.bloomYears[i]);
      var timeline = new vis.Timeline(container, graphData.data, graphData.options);
    }
  }

  $scope.createPlant = function() {
    $scope.plant = {
      'id': $scope.plantInformation.id,

      'class_name': $scope.plantInformation.class,
      'species_name': $scope.plantInformation.species,
      'variety_name': $scope.plantInformation.variety,
      'subtribe_name': $scope.plantInformation.subtribe,
      'tribe_name': $scope.plantInformation.tribe,
      'genus_name': $scope.plantInformation.genus,
        'phylum_name' : $scope.plantInformation.phylum,

      'parent_one': $scope.plantInformation.parent_one,
      'parent_two': $scope.plantInformation.parent_two,
      'grex_status': $scope.plantInformation.grex_status,
      'hybrid_status': $scope.plantInformation.hybrid_status,

      'description': $scope.plantInformation.description,
      'culture': $scope.plantInformation.culture
    };

    PhotoFactory.getPhotosByPlantID($scope.plant.id).then(function (response){
        var data = response.data.data;

        $scope.allimagesURL = [];

        var r = 0;
        for(r = 0; r < data.length; r++){
            $scope.allimagesURL.push(data[r].url);
        }

        var foundProfilePicture = false;
        for(var i = 0;i < $scope.allimagesURL.length; i++){
            if($scope.allimagesURL[i].type == "profile"){
                $scope.profilePicture = $scope.allimagesURL[i];
                foundProfilePicture = faslse = true;
                $scope.haveProfilePicture = true;
            }
        }
        if(foundProfilePicture == false){
            for(var i = 0;i < $scope.allimagesURL.length; i++){
                $scope.profilePicture = $scope.allimagesURL[i];
                $scope.haveProfilePicture = true;
                break;
            }
        }
    }, function(error) {
      $error.handle(error);
    });


    for(var i = 0; i < $scope.photoInformation.length; i++){
        $scope.allimagesURL.add($scope.photoInformation[i].url);
    }
    $scope.oneURL = $scope.allimagesURL[0];
  };

  $scope.goBack = function() {
      window.history.back();
  };

});
