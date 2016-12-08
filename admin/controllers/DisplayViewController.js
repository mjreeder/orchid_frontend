app.controller('DisplayViewController', function(CONFIG, $scope, $location, PlantsFactory){

    $scope.switchRooms = function($event){
        console.log($event.currentTarget.id);
    };

    $('svg').on('click', '> g', function(){
        var abbreviation = $(this).attr('id');
        if(abbreviation == "Background"){

        } else {
            $location.path("/table/" + abbreviation);
        }

    });

});
