app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory) {
    $scope.plantKeys = [];
    $scope.displayAttributes = [];
    var currentPage = 1;

    $scope.getPlantsBySearch = function(searchItem) {
        // if the search box goes to empty, give default view
        // and return function before network call
        if (searchItem == '') {
            getPaginatedPlants();
            return;
        }

        PlantsFactory.getPlantBySearch(searchItem, currentPage).then(function(response) {
            $scope.plants = placePlantAttributes(response);

        });
    }

    // loop over the plants array, and for each plant change the visibility of the
    // attribute that was checked
    $scope.editFilterDisplay = function(key) {
      // console.log(varb, plant);
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

    $scope.getMorePlantInfo = function (plant) {
      for (var i = 0; i< plant.length; i++) {
        if(plant[i].key == 'accession number'){
          $location.path("/plant/" + plant[i].val);
        }
      }
    }

    // function to get plants based on first letter and index
    // each plant becomes a list of attributes
    // each attribute is an object that contains the display name:key
    // the value:val and isDisplayed
    function getPaginatedPlants() {
        PlantsFactory.getPaginatedPlants('a', 1).then(function(response) {
            $scope.plants = placePlantAttributes(response);
        });
    }

    function placePlantAttributes(response) {
      var plants = [];
      for (var i = 0; i < response.data.data.length; i++) {
          var plant = [];
          var attributes = Object.keys(response.data.data[i]);
          for (var j = 0; j < attributes.length; j++) {
              var val = attributes[j];
              //default displays
              if (attributes[j] == 'accession_number' || attributes[j] == 'name') {
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
      return plants;
    }

    getPaginatedPlants();
});
