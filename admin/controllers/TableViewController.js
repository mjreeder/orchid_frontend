app.controller('TableViewController', function($route, CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope, TagFactory) {

    var param1 = $routeParams.table_name;


    $scope.id = 7;


    $scope.lol = "hhh";
    LocationFactory.getTableNameFromID(param1).then(function(response) {
        //$scope.current_table_name = response.data.data.name;
        //console.log($scope.table_name.name);
    });

    $scope.showTable = false;
    $scope.plantsInTable = [];


    LocationFactory.checkTable(param1).then(function(response) {
        //var answer = response.data;
        //console.log(response.data.data.name);
        var help = response.data.data[0];

        console.log(help);


        if (help == false) {

            $location.path('#/404');


        } else {
            $scope.current_table_name = param1;
            $scope.id = response.data.data.id;
            $scope.room_type = response.data.data.room;
            console.log($scope.room_type);


            PlantsFactory.getByLocationID($scope.id).then(function(response) {
                console.log("here is the data");
                console.log(response.data.data);
                if (response.data[0] == false) {
                    $scope.showTable = false;

                } else {

                    $scope.showTable = true;

                    $scope.plantsInTable = response.data.data;
                    console.log($scope.plantsInTable);

                    for (var i = 0; i < $scope.plantsInTable.length; i++) {
                        var plant = $scope.plantsInTable[i];

                        TagFactory.getPestByPlantID(plant.id).then(function(response) {
                            var tagResponse = response.data.data;
                            //console.log(tagResponse);
                            //console.log(tagResponse.plant_id);

                            for (var i = 0; i < $scope.plantsInTable.length; i++) {
                                if ($scope.plantsInTable[i].id == tagResponse.plant_id) {
                                    $scope.plantsInTable[i].tagged = true;
                                    console.log($scope.plantsInTable[i]);
                                }
                            }

                        });

                    }

                }


            });
        }
    });

    $scope.movePlants = false;

    $scope.movePlantsFunction = function() {
        console.log("hello");
        if ($scope.movePlants == false) {
            $scope.movePlants = true;




        } else {
            $scope.movePlants = false;
        }
    };







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


    var addVarified = function(plant) {
      console.log(plant);

        PlantsFactory.updateVarifiedDate(plant.id).then(function (response) {
          plant.last_varified = response.data.data.last_varified;
        });

    };


    $scope.addedMovePlants = [];

    $scope.didMovePlants = false;

    var index = 0;

    $scope.wantPlantMoved = function(plant) {
        $scope.added = false;

        for (var i = 0; i < $scope.addedMovePlants.length; i++) {
            if (plant.id == $scope.addedMovePlants[i]) {
                console.log($scope.addedMovePlants[i].id);
                index = i;
                $scope.didMovePlants = true;
                $scope.addedMovePlants.splice(i, 1);
                break;

            }
        }
        if ($scope.didMovePlants == false) {
            $scope.addedMovePlants.push(plant);
        } else {
            $scope.addedMovePlants.splice(index, 1);
        }
    };


    $scope.updateDates = function() {
        for (var i = 0; i < $scope.addedPlants.length; i++) {
            console.log($scope.addedPlants[i]);
            PlantsFactory.updateVarifiedDate($scope.addedPlants[i]).then(function(response) {

            });
        }

        $route.reload();
    };



    $scope.popupShow = false;

    $scope.showPopup2 = false;

    $scope.showPopup = function(plant) {
        $rootScope.$broadcast('current-plant', plant);
        $scope.popupShow = !$scope.popupShow;
    };

    $scope.$on('popup-close', function(event, data) {
        if (data == true) {
            $scope.popupShow = false;
        }
    });

    $scope.name = "biiy jean";

    $scope.showMoveFunction = function() {
        console.log("we are going to the pop up");
        $rootScope.$broadcast('abc', {
            any: {
                'a': $scope.addedMovePlants
            }
        });
        $scope.showPopup2 = !$scope.showPopup2;
        $rootScope.$broadcast('hi');
    };

    $scope.$on('popup-close2', function(event, data) {
        if (data == true) {
            $scope.showPopup2 = false;
        }
    });
});
