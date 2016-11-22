app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory) {
  var displayAttributes = [];
  $scope.currentPage = 1;
  $scope.numberOfPages;
  $scope.maxSize = 3;
  $scope.searchItem;

  //ng-change function for search bar
  $scope.getPlantsBySearch = function() {
    //if search goes empty, bring back to default
    if ($scope.searchItem == '') {
      displayAttributes = [];
      getPaginatedPlants();
    } else {
      // set current page to one, set on displayAttributes on and call getPaginatedPlants
      $scope.currentPage = 1;
      displayAll();
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

  //helper function to turn on all attributes
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

  // function to link the plant to the more info page with corresponding id
  $scope.getMorePlantInfo = function(plant) {
    for (var i = 0; i < plant.length; i++) {
      if (plant[i].key == 'accession number') {
        $location.path("/plant/" + plant[i].val);
      }
    }
  }

  // ng-change function when a new page in the paginator is clicked, or next/previous
  $scope.pageChange = function(){
    getPaginatedPlants();
  }

  // function to get plants based on desired index
  // sets pagination data from response
  function getPaginatedPlants() {
    // checks if there is a search item for different api call
    if ($scope.searchItem == null || $scope.searchItem == undefined || $scope.searchItem == '') {
      PlantsFactory.getAllPaginatedPlants($scope.currentPage).then(function(response) {
        $scope.numberOfPages = response.data.data.pages;
        $scope.totalPlants = response.data.data.total;
        $scope.plants = placePlantAttributes(response);
      });
    } else {
      PlantsFactory.getPlantBySearch($scope.searchItem, $scope.currentPage).then(function(response) {
        $scope.totalPlants = response.data.data.total;
        $scope.numberOfPages = response.data.data.pages;
        $scope.plants = placePlantAttributes(response);

      });
    }

  }

  function placePlantAttributes(response) {
    var plants = [];
    for (var i = 0; i < response.data.data.plants.length; i++) {
      var plant = [];
      var attributes = Object.keys(response.data.data.plants[i]);
      for (var j = 0; j < attributes.length; j++) {
        var val = attributes[j];
        //attributeReplace is for grabbing dual words such as scientific_name
        var attributeReplace = attributes[j].replace(/[^a-zA-Z ]/g, " ");
        if (attributes[j] == 'accession_number' || attributes[j] == 'name' || displayAttributes.indexOf(attributeReplace) !== -1) {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': response.data.data.plants[i][val],
            'isDisplayed': true
          }
        } else {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': response.data.data.plants[i][val],
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

  // initialize plants for page
  getPaginatedPlants();
});
