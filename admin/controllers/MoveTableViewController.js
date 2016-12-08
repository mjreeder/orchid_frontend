app.controller('MoveTableViewController', function($route, $scope, $rootScope, PlantsFactory){

    $scope.click = function(){
        console.log("");
    };
    $scope.changedRoom = "";
    $scope.changed = false;

    $scope.$on('abc', function(event, data){
        $scope.addedMovePlants = data.any;

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

    $scope.saveID = undefined;

    /*
    CHANGING the COLORS on the SVGs
     */
    $('body').on('click', 'svg > g', function(){
        var abbreviation = $(this).attr('id');
        //Specific Check if is the background
        if(abbreviation == "Background"){

        }else {
            $scope.changed = true;
            
            $scope.changedRoom = abbreviation;
            if ($scope.saveID == undefined || $scope.saveID == null) {

            } else {//fill:#EAEEE7;
                $($scope.saveID).find('[style*= "fill: #19977b"]').css('fill', '#EAEEE7');
                $($scope.saveID).find('[style*= "fill: rgb(25, 151, 123)"]').css('fill', '#EAEEE7');
            }

            $scope.saveID = "";
            $scope.saveID = this;

            //if the color has not been changged
            $(this).find('[style*="EAEEE7"]').css('fill', '#19977b');

            //this is for the color that has already been changed
            $(this).find('[style*="fill: rgb(234, 238, 231)"]').css('fill', '#19977B');
            $(this).find('[style*="ffffff"]').css('fill', '#19977b');
            
            $scope.$apply();
        }
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
