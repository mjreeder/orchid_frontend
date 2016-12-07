orchidApp.controller('plantController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory, BloomingFactory, bloomService) {

  $scope.NAMEOFPAGE = $stateParams.accession_number;

  $scope.noPlant = false;
  $scope.plantInformation = "";
  $scope.photoInformation = [];
  $scope.url = "";
  $scope.plant = {};
  $scope.bloomYears = [];
  $scope.blooms = [];
  $scope.allimagesURL = [];
  $scope.bloomingMoreShow = true;

  console.log($scope.NAMEOFPAGE);
  PlantsFactory.getPlantByAccessionNumber($scope.NAMEOFPAGE).then(function(response) {
    console.log(response);
    if (response.data.data[0] == false) {
      $scope.noPlant = false;
      //route to 404 if not found
      $location.path('/404');
    } else {

      $scope.noPlant = true;
      $scope.plantInformation = response.data.data[0];

      //get plant blooms for bloom graph
      var bloomPage = 0;
      $scope.getMoreBlooms = function() {
        bloomPage++;
        BloomingFactory.getAllBloomByPlantID($scope.plantInformation.id).then(function(response) {
          var data = response.data.data;
          console.log(data);
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
        })
      }
      $scope.getMoreBlooms();
      $scope.createPlant();
    }
  }, function(error) {

    console.log("404");
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
    console.log($scope.plantInformation);
    $scope.plant = {
      'id': $scope.plantInformation.id,

      'class_name': $scope.plantInformation.class_name,
      'species_name': $scope.plantInformation.species_name,
      'variety_name': $scope.plantInformation.variety_name,
      'subtribe_name': $scope.plantInformation.subtribe_name,
      'tribe_name': $scope.plantInformation.tribe_name,
      'genus_name': $scope.plantInformation.genus_name,

      'parent_one': $scope.plantInformation.parent_one,
      'parent_two': $scope.plantInformation.parent_two,
      'grex_status': $scope.plantInformation.grex_status,
      'hybrid_status': $scope.plantInformation.hybrid_status,

      'description': $scope.plantInformation.description,
      'culture': $scope.plantInformation.culture
    };

    PhotoFactory.getPhotosByPlantID($scope.plant.id).then(function(response) {
      console.log(response);

      var data = response.data.data;
      for (var i = 0; i < data.length; i++) {
        $scope.allimagesURL.push(data[i].url);
      }

    });




    for (var i = 0; i < $scope.photoInformation.length; i++) {
      console.log($scope.photoInformation[i].url);
      allimagesURL.add($scope.photoInformation[i].url);
    }

    console.log($scope.allimagesURL.length);
    for (var i = 0; i < $scope.allimagesURL.length; i++) {
      console.log($scope.allimagesURL[i]);
    }





  };

  var myIndex = 0;
  carousel();

  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
  }


  console.log("WE ARE AT THE PLANT VIEW CONTROLLER");


});
