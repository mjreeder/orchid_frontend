app.controller('TableViewController', function($route, CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope, TagFactory, VerifiedFactory) {

    var param1 = $routeParams.table_name;

    $scope.showTable = false;
    $scope.plantsInTable = [];

    LocationFactory.checkTable(param1).then(function(response) {
        var booleanValue = response.data.data[0];

        if (booleanValue == false) {
            $location.path('#/404');
        } else {
            //we are in a legal table
            $scope.current_table_name = param1;
            $scope.id = response.data.data.id;
            $scope.room_type = response.data.data.room;

            //GETTING THE LOCATION AND THE VERIFICATION INFORMATION FOR EACH PLANT
            PlantsFactory.getByLocationID($scope.id).then(function(response) {
                if (response.data[0] == false) {
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                    $scope.plantsInTable = response.data.data;

                    for(var i = 0; i < $scope.plantsInTable.length; i++){
                        var in_date = $scope.plantsInTable[i].inactive_date;

                        if(in_date == "0000-00-00" || in_date == null){
                            //do nothing since there is no date.
                        } else {

                            $scope.plantsInTable.splice(i, 1);
                        }
                    }

                    for(var i = 0; i < $scope.plantsInTable.length; i++){
                        var de_date = $scope.plantsInTable[i].dead_date;

                        if(de_date == "0000-00-00" || de_date == null){
                            //do nothing since there is no date.
                        } else {
                            $scope.plantsInTable.splice(i, 1);
                        }
                    }

                    for (var i = 0; i < $scope.plantsInTable.length; i++) {

                        $scope.plantsInTable[i].last_varified = "0000-00-00";
                        $scope.plantsInTable[i].isToday = false;


                    }

                    var promArray = [];

                    for (var i = 0; i < $scope.plantsInTable.length; i++) {
                        var plant = $scope.plantsInTable[i];

                        //UPDATING THE COLOR OF THE PLANTS
                        TagFactory.getPestByPlantID(plant.id).then(function(response) {
                            var tagResponse = response.data.data;

                            for (var i = 0; i < $scope.plantsInTable.length; i++) {
                                if ($scope.plantsInTable[i].id == tagResponse.plant_id) {
                                    if(tagResponse.active == 1){
                                        $scope.plantsInTable[i].tagged = true;
                                    } else {

                                    }

                                }
                                $scope.plantsInTable[i].addObeject = "value3";

                            }

                        });

                        var prom = new Promise(function(resolve, reject) {
                                //GETTING THE VERIFIED RECORDS FOR ALL THE PLANTS
                                VerifiedFactory.getLastVerifiedDate(plant.id).then(function (response){
                                    var verifiedResponse = response.data.data;
                                    resolve(verifiedResponse);
                                },
                            function (err){
                                reject(err);
                            });
                        });
                        promArray.push(prom);
                    }

                    Promise.all(promArray).then(function (success) {
                        var updateList = [];
                        for (var i = 0; i < success.length; i++){
                            if (success[i] != ""){
                                var id = success[i][0].plant_id;
                                updateList.push(success[i][0]);
                            }
                        }

                        for (var p = 0; p < updateList.length; p++){
                            var id = updateList[p].plant_id;
                            for (var t = 0; t < $scope.plantsInTable.length; t++){
                                if (id == $scope.plantsInTable[t].id){
                                    console.log(updateList[p].verified_date);
                                    $scope.plantsInTable[t].last_varified = updateList[p].verified_date;
                                    //console.log( $scope.plantsInTable[t].isToday);
                                    console.log($scope.plantsInTable[t].last_varified);
                                    if(checkIfDateIsToday($scope.plantsInTable[t].last_varified)){
                                        $scope.plantsInTable[t].isToday = true;
                                        console.log( $scope.plantsInTable[p].isToday);
                                    }else {
                                        console.log( $scope.plantsInTable[p].isToday);

                                    }


                                }
                            }
                        }

                        for (var t = 0; t < $scope.plantsInTable.length; t++){
                            if($scope.plantsInTable[t].last_varified == "0000-00-00"){
                                $scope.plantsInTable[t].last_varified = "N/A";
                                $scope.plantsInTable[t].isToday = false;

                            } else {
                               
                            }
                        }

                        $scope.$apply();

                    }, function (error) {
                    });

                }

                $scope.showRows = $scope.plantsInTable[0];
                for(var i = 0; i < $scope.plantsInTable.length; i++){
                    if(!$scope.plantsInTable[i]){
                        $scope.SHOWTHISNOW = false;
                    } else {
                        $scope.SHOWTHISNOW = true;
                    }
                }
            });


        }
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
        //console.log(dateString);
      var previousDay = moment(dateString).dayOfYear();
      var previousYear = moment(dateString).year();
      var currentDay = moment().dayOfYear();
      var currentYear = moment().year();
      if((previousDay == currentDay) && (previousYear == currentYear)){
          //console.log(previousDay + "   " + currentDay + "    "+ previousYear + "   " + currentYear);
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

    $scope.showMoveFunction = function() {
        $rootScope.$broadcast('abc', {
            any: {
                'a': $scope.addedMovePlants
            }
        });
        $scope.showPopup2 = !$scope.showPopup2;
    };

    $scope.$on('popup-close2', function(event, data) {
        if (data == true) {
            $scope.showPopup2 = false;
        }
    });
});
