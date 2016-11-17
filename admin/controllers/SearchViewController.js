app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory) {
  var displayAttributes = [];
  $scope.currentPage = 1;
  $scope.toEllipsiedPage = 5;
  $scope.pageArray = [];
  $scope.numberOfPages;
  $scope.reverseEllipsePoint;

  PlantsFactory.getAmountOfPages().then(function(response) {
    $scope.numberOfPages = response.data.data[0];
    $scope.reverseEllipsePoint = $scope.numberOfPages - $scope.toEllipsiedPage;
    if ($scope.numberOfPages > $scope.toEllipsiedPage) {
      for (var i = 2; i < $scope.toEllipsiedPage; i++) {
        $scope.pageArray.push(i);
      }
      $scope.pageArray.push('...');
    } else {
      for (var i = 2; i < $scope.numberOfPages; i++) {
        $scope.pageArray.push(i);
      }
    }

  });

  $scope.shifSlotsAndChangePage = function(number, index) {
    if (number == '...') {
      // clicking up
      if (index >= 3) {
        $scope.pageArray.pop();
        //get the page number before the ...
        var desiredNumber = $scope.pageArray.splice($scope.pageArray.length - 1, 1);
        desiredNumber = desiredNumber[0] + 1;
        $scope.pageArray = [];
        if (desiredNumber >= $scope.toEllipsiedPage) {
          $scope.pageArray.splice(0, 0, '...');
        }
        $scope.toEllipsiedPage += 3;
        for (var i = desiredNumber; i < $scope.toEllipsiedPage; i++) {
          if (i !== $scope.numberOfPages) {
            $scope.pageArray.push(i);
          }
        }
        if ($scope.numberOfPages - desiredNumber > 3) {
          $scope.pageArray.push('...');
        }
      }
      // clicking down
      else {
        $scope.pageArray.splice(0, 1);
        var desiredNumber = $scope.pageArray.splice(0, 1);
        desiredNumber = desiredNumber[0] - 1;
        $scope.pageArray = [];
        var previousEllipsiedPoint = $scope.toEllipsiedPage;
        if (desiredNumber <= $scope.toEllipsiedPage) {
          $scope.pageArray.splice(0, 0, '...');
        }
        $scope.toEllipsiedPage = desiredNumber + 1;
        for (var i = desiredNumber - 2; i < $scope.toEllipsiedPage; i++) {
          $scope.pageArray.push(i);
        }
        if (desiredNumber <= previousEllipsiedPoint) {
          $scope.pageArray.push('...');
        }
        // check if first number is in the first set
        // remeove ellipsy
        if (($scope.pageArray[1] - 1) <= 1) {
          $scope.pageArray.splice(0, 1);
        }

      }

      $scope.currentPage = desiredNumber;
      getPaginatedPlants();

    } else {
      if (number == 1) {
        $scope.pageArray = [];
        $scope.toEllipsiedPage = 5;
        for (var i = 2; i < $scope.toEllipsiedPage; i++) {
          $scope.pageArray.push(i);
        }
        $scope.pageArray.push('...');
      } else if (number == $scope.numberOfPages) {
        $scope.pageArray = [];
        $scope.toEllipsiedPage = $scope.numberOfPages - 3;
        for (var i = $scope.toEllipsiedPage; i < number; i++) {
          $scope.pageArray.push(i);
        }
        $scope.pageArray.splice(0, 1, "...");
      }
      $scope.currentPage = number;
      getPaginatedPlants();
    }
  }

  $scope.isCurrentPage = function(number) {
    if (number == $scope.currentPage) {
      return true;
    }
  }

  $scope.previousPage = function() {
    if ($scope.currentPage !== 1) {
      var number = $scope.currentPage - 1;
      // if number is not in the page array
      if(number == 1){
        $scope.shifSlotsAndChangePage(1,0);
      }
      else if ($scope.pageArray.indexOf(number) == -1) {
        $scope.shifSlotsAndChangePage("...", 0);
      }
      else {
        $scope.shifSlotsAndChangePage(number, 0);
      }
    }
  }

  $scope.nextPage = function() {
    if($scope.currentPage !== $scope.numberOfPages && $scope.currentPage !== $scope.numberOfPages-1){
      var number = $scope.currentPage + 1;
      if($scope.pageArray.indexOf(number) == -1){
        $scope.shifSlotsAndChangePage("...", 3);
      }
      else{
        $scope.shifSlotsAndChangePage(number, 3);
      }
    }
    else if ($scope.currentPage == $scope.numberOfPages - 1) {
      var number = $scope.numberOfPages;
      $scope.shifSlotsAndChangePage(number, 3);
    }
  }

  $scope.getPlantsBySearch = function(searchItem) {
    if (searchItem == '') {
      displayAttributes = [];
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

  // function to get plants based on first letter and index
  // each plant becomes a list of attributes
  // each attribute is an object that contains the display name:key
  // the value:val and isDisplayed
  function getPaginatedPlants() {
    if ($scope.searchItem == null || $scope.searchItem == undefined || $scope.searchItem == '') {
      PlantsFactory.getAllPaginatedPlants($scope.currentPage).then(function(response) {
        $scope.plants = placePlantAttributes(response);
      });
    } else {
      PlantsFactory.getPlantBySearch(searchItem, $scope.currentPage).then(function(response) {
        $scope.plants = placePlantAttributes(response);
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
