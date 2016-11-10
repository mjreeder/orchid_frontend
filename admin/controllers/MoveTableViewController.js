app.controller('MoveTableViewController', function($route, $scope, $rootScope, PlantsFactory){

    $scope.click = function(){
        console.log("");
    };
    $scope.changedRoom = "";
    $scope.changed = false;


    $scope.x = {};
    $scope.$on('abc', function(event, data){
        $scope.addedMovePlants = data.any;
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

        if($scope.changedRoom != "") {
            for (var i = 0; i < $scope.a.length; i++) {


                var moveInformation = {id: $scope.a[i].id, name: $scope.changedRoom};

                PlantsFactory.editLocation(moveInformation).then(function (response) {
                    console.log(response);
                });
            }
        } else {

        }

        $route.reload();
    };

    $scope.loadRoom = function($event){
    };

    $('body').on('click', 'svg > g', function(){
        $scope.changed = true;
        var abbreviation = $(this).attr('id');
        $scope.changedRoom = abbreviation;
        $scope.$apply();
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

    $scope.closePopUp = function() {
      $rootScope.$broadcast('popup-close2', true);
    }

});
