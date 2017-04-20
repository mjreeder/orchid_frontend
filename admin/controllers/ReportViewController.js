app.controller('ReportViewController', function(CONFIG, PlantsFactory, $scope){


    PlantsFactory.getDeadPlantsInYear().then(function (response){
        $scope.dead_years = response.data.data;
    }, function (error){

    });

    PlantsFactory.getDistinctCount().then(function (response){
        //$scope.unique_genus = response.data.data;
        console.log(response.data.data.genus);
        $scope.unique_genus = response.data.data.genus.genus_number;
        $scope.unique_species = response.data.data.species.species_number;
        console.log($scope.unique_genus);

    }, function (error){

    });

    PlantsFactory.getCount().then(function (response){
        $scope.living_plants = response.data.data['COUNT(*)'];
        //$scope.number_living = response.data.
    }, function (error){

    });
});
