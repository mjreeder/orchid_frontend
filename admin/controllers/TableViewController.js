app.controller('TableViewController', function(CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope){

    var param1 = $routeParams.table_name;


    $scope.id = 7;




    LocationFactory.getTableNameFromID(param1).then(function (response){
        //$scope.current_table_name = response.data.data.name;
        //console.log($scope.table_name.name);
    });

    LocationFactory.checkTable(param1).then(function (response){
        //var answer = response.data;
        //console.log(response.data.data.name);
        var help = response.data.data[0];

        if (help == false){
            $location.path('#/404');


        } else {
            $scope.current_table_name = param1;
            $scope.id  = response.data.data.id;
            console.log($scope.id);

            PlantsFactory.getByLocationID($scope.id).then(function (response) {
                console.log($scope.id);
                $scope.plantsInTable = response.data.data;
                console.log($scope.plantsInTable);
            });
        }
    });

    //PlantsFactory.getByLocationName(param1).then(function(response){
    //    $scope.plantsInTable = response.data.data;
    //});







    //LocationFactory.getTableNameFromID(4).then(function (response) {
    //    console.log(response.data);
    //   //
    //   $scope.table_name = response.data;
    //    console.log("HELLO");
    //    console.log($scope.table_name);
    //   // console.log($scope.table_name);
    //});


  $scope.popupShow = false;

  $scope.showPopup = function(plant) {
    console.log(plant);
    $rootScope.$broadcast('current-plant', plant);
    $scope.popupShow = !$scope.popupShow;
  }

  $scope.$on('popup-close', function(event, data){
    if(data == true){
      $scope.popupShow = false;
    }
  })

});
