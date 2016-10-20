app.controller('MoveTableViewController', function($route, $scope, $rootScope, PlantsFactory, $window){

    $scope.click = function(){
        console.log("");
    };
    $scope.changedRoom = "";


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
            $scope.a[t] = $scope.addedMovePlants.a[t];
        }

        for (var a = 0; a < $scope.addedMovePlants.a.length; a++){
            console.log($scope.a[a]);
        }
        $scope.b ={
            name: $scope.addedMovePlants.a[0]
        };

    });

    $scope.movePlants = function(){

        if($scope.changedRoom.length != 0) {
            for (var i = 0; i < $scope.a.length; i++) {
                console.log($scope.a[i].id);
                console.log($scope.changedRoom);

                var moveInformation = {id: $scope.a[i].id, name: $scope.changedRoom};

                PlantsFactory.editLocation(moveInformation).then(function (response) {
                    console.log(response);
                    $window.alert("Finished! Moved the plant");

                });
            }
        } else {
            $window.alert("Must click room to proceed");

        }
    };

    $scope.loadRoom = function($event){
        console.log($event.currentTarget.id);
    };

    $('body').on('click', 'svg > g', function(){
        console.log("we clicked on the image");
        var abbreviation = $(this).attr('id');
        $scope.changedRoom = abbreviation;
        console.log(abbreviation);
    });

    $scope.WarmPopup = false;
    $scope.DisplayPopup = false;
    $scope.CoolPopup = false;

    $scope.showWarmPopup = function() {
        if($scope.WarmPopup == false){
            $scope.CoolPopup = false;
            $scope.WarmPopup = true;
            $scope.DisplayPopup = false;
        } else {
            $scope.WarmPopup = false;
        }
    };


    $scope.showCoolPopup = function() {
        if($scope.CoolPopup == false){
            $scope.CoolPopup = true;
            $scope.WarmPopup = false;
            $scope.DisplayPopup = false;
        } else {
            $scope.CoolPopup = false;
        }
    };

    $scope.showDisplayPopup = function() {
        if($scope.DisplayPopup == false){
            $scope.CoolPopup = false;
            $scope.WarmPopup = false;
            $scope.DisplayPopup = true;
        } else {
            $scope.DisplayPopup = false;
        }
    };

});


