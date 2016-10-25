app.controller('PhotoViewController', function($route, $scope, $rootScope, PlantsFactory, $window, PhotoFactory){

    $scope.click = function(){
        console.log("");
    };

    $scope.changedRoom = "";

    $scope.plantsURL = [];
    //todo look at the method that is going to close the pop up.


    $scope.chosenPicrture = "http://placekitten.com/200/300";

    $scope.x = {};
    $scope.$on('abc', function(event, data){
        $scope.addedMovePlants = data.any;
        console.log($scope.addedMovePlants);
        $scope.lol = "Seth Winslow";
        console.log($scope.lol);
        $scope.hamburger = console.log($scope.addedMovePlants.a[0].accession_number);
        console.log($scope.hamburger);
        $scope.x.name = $scope.addedMovePlants.a[0].accession_number;
        $scope.a = [];
        $scope.accession_number = "00000";


        for (var t = 0; t < $scope.addedMovePlants.a.length; t++){
            $scope.a[t] = $scope.addedMovePlants.a[t];
        }

        for (var a = 0; a < $scope.addedMovePlants.a.length; a++){
            console.log($scope.a[a]);
        }
        $scope.b ={
            name: $scope.addedMovePlants.a[0]
        };


    });
    PhotoFactory.getPhtosByPlantID(2).then(function(response){

        var data = response.data.data;
        for (var i = 0; i < data.length; i++){
            $scope.plantsURL[i] = data[i];
            console.log(data[i].url);
        }
        console.log();

    });

    $scope.clickedPhoto = function($photo){
        $scope.chosenPicrture = $photo.url;
    };








});


