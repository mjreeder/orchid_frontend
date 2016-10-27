app.controller('SearchViewController', function(CONFIG, $scope, $rootScope, $location, PlantsFactory, classificationLinkFactory) {
    var displayAttributes = [];
    var currentPage = 1;
    var currentAlpha = 'a';

    $scope.getPlantsBySearch = function(searchItem) {
        // if the search box goes to empty, give default view
        // and return function before network call
        if (searchItem == '') {
            getPaginatedPlants();
            return;
        }

        PlantsFactory.getPlantBySearch(searchItem, 1).then(function(response) {
            $scope.plants = placePlantAttributes(response);

        });
    }

    // loop over the plants array, and for each plant change the visibility of the
    // attribute that was checked
    $scope.editFilterDisplay = function(key) {
      // add key to the displayAttributes list
      if(displayAttributes.indexOf(key) == -1){
        displayAttributes.push(key);
      }
      else{
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
        PlantsFactory.getPaginatedPlants(currentAlpha, currentPage).then(function(response) {
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
              //default displays or if key is in the displayAttributes
              if (attributes[j] == 'accession_number' || attributes[j] == 'name' || displayAttributes.indexOf(attributes[j]) !== -1) {
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
