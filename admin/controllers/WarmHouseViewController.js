app.controller('WarmHouseViewController', function(CONFIG, $scope, $location){

    $scope.switchRooms = function($event){
    };

    $('svg').on('click', '> g', function(){
        var abbreviation = $(this).attr('id');
        console.log(abbreviation);
        $location.path("/table/" + abbreviation);
    });
});
