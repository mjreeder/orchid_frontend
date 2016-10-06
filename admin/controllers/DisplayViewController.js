app.controller('DisplayViewController', function(CONFIG, $scope, $location){


    $scope.switchRooms = function($event){


        console.log($event.currentTarget.id);
    }

    $('svg').on('click', '> g', function(){
        var abbreviation = $(this).attr('id');
        console.log(abbreviation);
        $location.path("/table/" + abbreviation);
    });
});
