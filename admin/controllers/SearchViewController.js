app.controller('SearchViewController', function(CONFIG, $scope, PlantsFactory) {
    $scope.displayAttributes = ['Accession Number', 'Name'];

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

        });
    }

    var result = _.pick(thing, function(value, key) {
        return _.startsWith(key, "a");
    });

    getPaginatedPlants();

});
