app.controller('MoveTableViewController', function($route, $scope, $rootScope, PlantsFactory){

    $scope.click = function(){
        console.log("hello");
    };

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
        for (var t = 0; t < $scope.addedMovePlants.a.length; t++){
            $scope.a[t] = $scope.addedMovePlants.a[t].id;
        }

        for (var a = 0; a < $scope.addedMovePlants.a.length; a++){
            console.log($scope.a[a]);
        }
        $scope.b ={
            name: $scope.addedMovePlants.a[0]
        };
    });

    $scope.plant = {
        id: 1,
        location_id: 4
    };




    $scope.movePlants = function(){

        for (var i = 0; i < $scope.a.length; i++) {



            PlantsFactory.editLocation($scope.plant).then(function (response) {
                console.log("we did it");
            });
        }
    };


    $scope.gem = {
        name:"Ring",
        price:2.9,
        Description:"",
    };
    $scope.seth  = {
        name:"barf",
    };

    console.log("hellosss");

    $scope.loadRoom = function($event){

        console.log("hellloo");
        console.log($event.currentTarget.id);
    };

    $('svg').on('click', '> g', function(){
        console.log("we clicked on the image");
        var abbreviation = $(this).attr('id');
        console.log(abbreviation);
    });

    //$rootScope.$on("hi", function(){
    //    console.log("CCC");
    //    //console.log($scope.addedMovePlants.a[0].name);
    //    console.log("CCC");
    //});



    //
    //$scope.lol = "Seth Winslow";

    //console.log($scope.lol);
    //console.log("aab");
    //console.log($scope.addedMovePlants);
    //console.log("aab");

    //consoel.log($scope.addedMovePlants);

    $scope.WarmPopup = false;
    $scope.showWarmPopup = function() {
        console.log("we just clicked on warm up");
        $scope.WarmPopup = true;
    };

    $scope.$on('warm-popup-close', function(event, data){
        if(data == true){
            $scope.WarmPopup = false;
        }
    });

    $scope.CoolPopup = false;
    $scope.showCoolPopup = function() {
        $scope.CoolPopup = !$scope.CoolPopup;

    };

    $scope.$on('cool-popup-close', function(event, data){
        if(data == true){
            $scope.CoolPopup = false;
        }
    });

    $scope.DisplayPopup = false;

    $scope.showDisplayPopup = function() {
        $scope.DisplayPopup = !$scope.DisplayPopup;
    };
    //
    //$scope.$on('display-popup-close', function(event, data){
    //    if(data == true){
    //        $scope.DisplayPopup = false;
    //    }
    //})




});


