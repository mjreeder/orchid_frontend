app.controller('TableViewController', function($route, CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope, TagFactory, VerifiedFactory, BloomingFactory) {

    var param1 = $routeParams.table_name;

    $scope.showTable = false;
    $scope.plantsInTable = [];
    $scope.tableDoneLoading = false;

    LocationFactory.checkTable(param1).then(function(response) {

        var booleanValue = response.data.data[0];

        if (booleanValue == false) {
            $location.path('#/404');
        }
            //we are in a legal table
            $scope.current_table_name = param1;
            $scope.id = response.data.data.id;
            $scope.room_type = response.data.data.room;

            //GETTING THE LOCATION AND THE VERIFICATION INFORMATION FOR EACH PLANT
            PlantsFactory.getByLocationID($scope.id).then(function(response) {

                console.log(response.data.data);
                if (response.data.data[0] == "Table Empty") {
                    console.log("There is no plants to load");
                    $scope.plantsToShow = false;
                } else {
                    console.log("we have plants to load");
                    $scope.plantsToShow = true;

                    for (var i = 0; i < response.data.data.length && response.data.data[0] != "Table Empty"; i++) {
                        var plantBlooming = response.data.data[i].blooming;
                        var plantInfo = response.data.data[i].info;
                        var plantTagged = response.data.data[i].tagged;
                        var plantVerified = response.data.data[i].verified;

                        //seeing it has a verfieid date
                        if (plantVerified == null) {
                            plantInfo.last_varified = "N/A";
                        } else {
                            var v_date = plantVerified[plantVerified.length - 1].verified_date;
                            plantInfo.isToday = checkIfDateIsToday(v_date);
                            plantInfo.last_varified = v_date;
                        }

                        //SEEING if it is taggged
                        if (plantTagged == null) {
                            plantInfo.tagged = false;
                        } else {
                            plantInfo.tagged = true;
                        }

                        //SEEING if the plant is blooming
                        if (plantBlooming == null) {
                            plantInfo.isBlooming = false;
                        } else {
                            plantInfo.isBlooming = true;
                        }

                        $scope.plantsInTable.push(plantInfo);
                    }
                }

                $scope.showTable = true;
                $scope.showRows = true;
            });
    });

    var formatVerification = function(){
      for(var i = 0; i < $scope.plantsInTable.length; i++){
        if($scope.plantsInTable[i].last_varified == "0000-00-00"){
          $scope.plantsInTable[i].last_varified = null;
        } else {
          var dateString = $scope.plantsInTable[i].last_varified;
          if(checkIfDateIsToday(dateString)){
            $scope.plantsInTable[i].verified = true;
          }
        }
      }
      return $scope;
    };

    var checkIfDateIsToday = function(dateString){
      var previousDay = moment(dateString).dayOfYear();
      var previousYear = moment(dateString).year();
      var currentDay = moment().dayOfYear();
      var currentYear = moment().year();
      if((previousDay == currentDay) && (previousYear == currentYear)){
        return true;
      } else {
        return false;
      }
    };

    $scope.movePlants = false;

    $scope.movePlantsFunction = function() {
        if ($scope.movePlants == false) {
            $scope.movePlants = true;

        } else {
            $scope.movePlants = false;
        }
    };

    $scope.addedPlants = [];

    $scope.added = false;

    $scope.addVarified = function(plant) {
        for (var i = 0; i < $scope.addedPlants.length; i++){
            if ($scope.addedPlants[i] == plant.id){
                break;
            }
        }

        $scope.addedPlants[$scope.addedPlants.length] = plant;
    };

    $scope.addedMovePlants = [];

    $scope.didMovePlants = false;

    $scope.showButton = false;

    $scope.wantPlantMoved = function(plant) {
        $scope.added = true;
        for(var i = 0; i < $scope.addedMovePlants.length; i++){
            if($scope.addedMovePlants[i].id == plant.id) {
                $scope.addedMovePlants.splice(i, 1);
                $scope.added = false;
            } else {

            }
        }

        if($scope.added == true){
            $scope.addedMovePlants.push(plant);
        }
        if($scope.addedMovePlants.length > 0){
            $scope.showButton = true;
        } else {
            $scope.showButton = false;
        }
    };

    $scope.updateDates = function() {
        for (var i = 0; i < $scope.addedPlants.length; i++) {
            var information = {
                plant_id: $scope.addedPlants[i].id
            };

            VerifiedFactory.createVerified(information).then(function (response){
            });
        }
        $route.reload();
    };

    $scope.mainPopUp = false;

    $scope.moveTablePopUpBoolean = false;

    $scope.showPopup = function(plant) {
        $rootScope.$broadcast('current-plant', plant);
        $scope.mainPopUp = !$scope.mainPopUp;
    };

    $scope.$on('popup-close', function(event, data) {
        if (data == true) {
            $scope.mainPopUp = false;
        }
    });

    $scope.showMoveFunction = function() {
        $rootScope.$broadcast('abc', {
            any: {
                'a': $scope.addedMovePlants
            }
        });
        $scope.moveTablePopUpBoolean = !$scope.moveTablePopUpBoolean;
    };

    $scope.$on('popup-close2', function(event, data) {
        if (data == true) {
            $scope.moveTablePopUpBoolean = false;
        }
    });
});
