app.controller('TableViewController', function($route, CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope){

    var param1 = $routeParams.table_name;


    $scope.id = 7;




    LocationFactory.getTableNameFromID(param1).then(function (response){
        //$scope.current_table_name = response.data.data.name;
        //console.log($scope.table_name.name);
    });

    $scope.showTable = false;


    LocationFactory.checkTable(param1).then(function (response){
        //var answer = response.data;
        //console.log(response.data.data.name);
        var help = response.data.data[0];

        console.log(help);


        if (help == false){

            $location.path('#/404');


        } else {
            $scope.current_table_name = param1;
            $scope.id  = response.data.data.id;
            console.log($scope.id);


            PlantsFactory.getByLocationID($scope.id).then(function (response) {
                console.log("here is the data");
                console.log(response.data.data);
                if (response.data.data[0] == false){
                    $scope.showTable = false;

                } else {

                    $scope.showTable = true;

                    $scope.plantsInTable = response.data.data;
                    console.log($scope.plantsInTable);
                }


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

    $scope.addedPlants = [];

    $scope.added = false;

    var index = 0;

    $scope.addVarified = function (plant){
        $scope.added = false;

        for (var i = 0; i < $scope.addedPlants.length; i++){
            if(plant.id == $scope.addedPlants[i]){
                console.log($scope.addedPlants[i].id);
                index = i;
                $scope.added = true;
                $scope.addedPlants.splice(i, 1);
                break;

            }
        }
        if($scope.added == false){
            $scope.addedPlants.push(plant);
        } else {
            $scope.addedPlants.splice(index, 1);
        }
    };

    $scope.updateDates = function(){
      for(var i = 0; i < $scope.addedPlants.length; i++){
          console.log($scope.addedPlants[i]);
          PlantsFactory.updateVarifiedDate($scope.addedPlants[i]).then(function (response) {

          });
      }

        $route.reload();
    };



  $scope.popupShow = false;

  $scope.showPopup = function(plant) {
    $rootScope.$broadcast('current-plant', plant);
    $scope.popupShow = !$scope.popupShow;
  }

  $scope.$on('popup-close', function(event, data){
    if(data == true){
      $scope.popupShow = false;
    }
  })

});
