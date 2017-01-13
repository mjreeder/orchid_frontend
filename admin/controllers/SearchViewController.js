app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory, plantAttributesService) {
  var displayAttributes = [];
  $scope.currentPage = 1;
  $scope.numberOfPages = 0;
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
        if ($scope.plants[i][j].key !== 'id' && $scope.plants[i][j].key !== 'username' && $scope.plants[i][j].key !== 'description' && $scope.plants[i][j].key !== 'inactive comment' && $scope.plants[i][j].key !== 'dead' && $scope.plants[i][j].key !== 'size' && $scope.plants[i][j].key !== 'value' && $scope.plants[i][j].key !== 'culture' && $scope.plants[i][j].key !== 'culture' && $scope.plants[i][j].key !== 'is donation' && $scope.plants[i][j].key !== 'hybrid comment' && $scope.plants[i][j].key !== 'hybrid status' && $scope.plants[i][j].key !== 'origin comment' && $scope.plants[i][j].key !== 'donation comment' && $scope.plants[i][j].key !== 'value' ) {
          $scope.plants[i][j].isDisplayed = true;
          displayAttributes.push($scope.plants[i][j].key)
        }

      }
    }
  }

  // function to link the plant to the more info page with corresponding id
  $scope.getMorePlantInfo = function(plant) {
    for (var i = 0; i < plant.length; i++) {
      if (plant[i].key == 'Accession #') {
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
      //changes the location and special collections id into name
      PlantsFactory.getAllPaginatedPlants($scope.currentPage).then(function(response) {
        $scope.numberOfPages = response.data.data.pages;
        $scope.totalPlants = response.data.data.total;
        $scope.plants = plantAttributesService.placePlantAttributes(response, displayAttributes);
      });
    } else {
      PlantsFactory.getPlantBySearch($scope.searchItem, $scope.currentPage).then(function(response) {
        //changes the location and special collections id into name
        $scope.totalPlants = response.data.data.total;
        $scope.numberOfPages = response.data.data.pages;
        $scope.plants = plantAttributesService.placePlantAttributes(response, displayAttributes);

      });
    }

  }

  // initialize plants for page
  getPaginatedPlants();
});
