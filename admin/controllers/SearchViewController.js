app.controller('SearchViewController', function(CONFIG, $scope, PlantsFactory, ClassificationLinkFactory) {
    $scope.plantKeys = [];
    $scope.getPlantsBySearch = function(searchItem) {
        // if the search box goes to empty, give default view
        // and return function before network call
        if (searchItem == '') {
            getPaginatedPlants();
            return;
        }

        PlantsFactory.getPlantBySearch(searchItem).then(function(response) {
            $scope.plants = response.data.data;
        });
    }

    //function to get plants based on first letter and index
    function getPaginatedPlants() {
        PlantsFactory.getPaginatedPlants('a', 1).then(function(response) {
            $scope.plants = response.data.data;
            // get the keys for the table header
            for (var key in $scope.plants[0]) {
              $scope.plantKeys.push(key);
            }
        });
    }

    // var result = _.pick(thing, function(value, key) {
    //
    //     return _.startsWith(key, "a");
    // });

    getPaginatedPlants();

});
