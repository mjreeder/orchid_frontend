app.controller('SearchViewController', function(CONFIG, $scope, PlantsFactory){

  PlantsFactory.getPaginatedPlants('a', 1).then(function(response){
    $scope.paginatedPlants = response.data.data;
  });

});
