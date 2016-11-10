app.controller('TableViewController', function($route, CONFIG, $scope, $location, LocationFactory, PlantsFactory, $routeParams, $rootScope, TagFactory, VerifiedFactory) {

    var param1 = $routeParams.table_name;

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

            //GETTING THE LOCATION AND THE VERIFICATION INFORMATION FOR EACH PLANT

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

                        $scope.plantsInTable[i].last_varified = "0000-00-00";

                    }

                    var promArray = [];



                    for (var i = 0; i < $scope.plantsInTable.length; i++) {
                        var plant = $scope.plantsInTable[i];


                        console.log(plant.id);

                        //UPDATING THE COLOR OF THE PLANTS
                        TagFactory.getPestByPlantID(plant.id).then(function(response) {
                            var tagResponse = response.data.data;


                            for (var i = 0; i < $scope.plantsInTable.length; i++) {
                                if ($scope.plantsInTable[i].id == tagResponse.plant_id) {
                                    $scope.plantsInTable[i].tagged = true;
                                    console.log($scope.plantsInTable[i]);
                                }
                                $scope.plantsInTable[i].addObeject = "value3";

                            }

                        });

                        var prom = new Promise((resolve, reject) => {
                                //GETTING THE VERIFIED RECORDS FOR ALL THE PLANTS
                                VerifiedFactory.getLastVerifiedDate(plant.id).then(function (response){
                                    var verifiedResponse = response.data.data;



                                    resolve(verifiedResponse);

                                },
                            function (error){
                                reject(error);
                            });
                        });

                        promArray.push(prom);
                    }

                    Promise.all(promArray).then(success => {
                        //console.log("This is the data");
                        //console.log(promArray);

                        var updateList = [];
                        console.log("we have some data");
                        for (var i = 0; i < success.length; i++){
                            if (success[i] != ""){
                                var id = success[i][0].plant_id;
                                console.log(id);
                                updateList.push(success[i][0]);

                            }
                        }

                console.log(updateList.length);

                        for (var p = 0; p < updateList.length; p++){
                            var id = updateList[p].plant_id;
                            for (var t = 0; t < $scope.plantsInTable.length; t++){

                                if (id == $scope.plantsInTable[t].id){
                                    $scope.plantsInTable[t].last_varified = updateList[p].verified_date;
                                    console.log($scope.plantsInTable[t]);
                                }
                            }
                        }

                for (var t = 0; t < $scope.plantsInTable.length; t++){

                    if($scope.plantsInTable[t].last_varified == "0000-00-00"){
                        $scope.plantsInTable[t].last_varified = "N/A";
                    }
                }

                $scope.$apply();

            }, error => {

                    });

                }

                $scope.showRows = $scope.plantsInTable[0];

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
      var previousDay = moment(dateString).dayOfYear();
      var previousYear = moment(dateString).year()
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


    $scope.addVarified = function(plant) {
        console.log("we are added the plants into the section");
        console.log(plant.id);
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

    var index = 0;

    $scope.wantPlantMoved = function(plant) {
        console.log(plant);
        $scope.added = true;
        console.log("length of :" + $scope.addedMovePlants.length);



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
        console.log($scope.addedMovePlants.length);
        if($scope.addedMovePlants.length > 0){
            $scope.showButton = true;
        } else {
            $scope.showButton = false;
        }
    };


    $scope.updateDates = function() {
        console.log("WE ARE IN THE UPDATE SECTION");
        for (var i = 0; i < $scope.addedPlants.length; i++) {
            console.log($scope.addedPlants[i].id);
            var information = {
                plant_id: $scope.addedPlants[i].id
            };
            console.log(information);

            VerifiedFactory.createVerified(information).then(function (response){
                console.log(response);
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
    };

    $scope.$on('popup-close2', function(event, data) {
        if (data == true) {
            $scope.showPopup2 = false;
        }
    });
});
