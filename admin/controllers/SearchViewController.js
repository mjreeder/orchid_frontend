app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory) {
  var displayAttributes = [];
  $scope.currentPage = 1;
  $scope.toEllipsiedPage = 5;
  $scope.pageArray = [];
  $scope.totalPlants = 175;
  $scope.numberOfPages = 7;
  $scope.reverseEllipsePoint;
  $scope.maxSize = 4;




  $scope.isCurrentPage = function(number) {
    if (number == $scope.currentPage) {
      return true;
    }
  }

  $scope.previousPage = function() {

  }

  $scope.nextPage = function() {

  }

  $scope.getPlantsBySearch = function(searchItem) {
    if (searchItem == '') {
      displayAttributes = [];
      displayAll();
      getPaginatedPlants();
    } else {
      $scope.currentPage = 1;
      getPaginatedPlants();
    }
  }

  // loop over the plants array, and for each plant change the visibility of the
  // attribute that was checked
  $scope.editFilterDisplay = function(key) {
    // add key to the displayAttributes list

    if (displayAttributes.indexOf(key) == -1) {
      displayAttributes.push(key);
    } else {
      // remove from displayAttributes list
      var index = displayAttributes.indexOf(key);
      displayAttributes.splice(index, 1);
    }

    for (var i = 0; i < $scope.plants.length; i++) {
      for (var j = 0; j < $scope.plants[i].length; j++) {
        if ($scope.plants[i][j].key == key) {
          if ($scope.plants[i][j].isDisplayed == false) {
            $scope.plants[i][j].isDisplayed = true;
          } else {
            $scope.plants[i][j].isDisplayed = false;
          }
        }
      }
    }
  }

  function displayAll() {
    displayAttributes = [];
    for (var i = 0; i < $scope.plants.length; i++) {
      for (var j = 0; j < $scope.plants[i].length; j++) {
        if ($scope.plants[i][j].key !== 'id') {
          $scope.plants[i][j].isDisplayed = true;
          displayAttributes.push($scope.plants[i][j].key)
        }

      }
    }
  }

  $scope.getMorePlantInfo = function(plant) {
    for (var i = 0; i < plant.length; i++) {
      if (plant[i].key == 'accession number') {
        $location.path("/plant/" + plant[i].val);
      }
    }
  }

  $scope.pageChange = function(){
    getPaginatedPlants();
  }

  // function to get plants based on first letter and index
  // each plant becomes a list of attributes
  // each attribute is an object that contains the display name:key
  // the value:val and isDisplayed
  function getPaginatedPlants() {
    console.log($scope.currentPage);
    if ($scope.searchItem == null || $scope.searchItem == undefined || $scope.searchItem == '') {
      PlantsFactory.getAllPaginatedPlants($scope.currentPage).then(function(response) {
        // $scope.numberOfPages = response.data.data.pages;
        $scope.totalPlants = response.data.data.total;
        response.data.data = response.data.data.plants;
        $scope.plants = placePlantAttributes(response);
      });
    } else {
      PlantsFactory.getPlantBySearch(searchItem, $scope.currentPage).then(function(response) {
        $scope.plants = placePlantAttributes(response);
        $scope.numberOfPages = response.data.data.pages;
      });
    }

  }

  function placePlantAttributes(response) {
    var plants = [];
    for (var i = 0; i < response.data.data.length; i++) {
      var plant = [];
      var attributes = Object.keys(response.data.data[i]);
      for (var j = 0; j < attributes.length; j++) {
        var val = attributes[j];
        //attributeReplace is for grabbing dual words such as scientific_name
        var attributeReplace = attributes[j].replace(/[^a-zA-Z ]/g, " ");
        if (attributes[j] == 'accession_number' || attributes[j] == 'name' || displayAttributes.indexOf(attributeReplace) !== -1) {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': response.data.data[i][val],
            'isDisplayed': true
          }
        } else {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': response.data.data[i][val],
            'isDisplayed': false
          }
        }
        plant.push(attribute);
      }
      plants.push(plant);
    }
    // console.log(plants, displayAttributes);
    return plants;
  }

  getPaginatedPlants();
});
