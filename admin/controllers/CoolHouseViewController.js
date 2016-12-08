app.controller('CoolHouseViewController', function(CONFIG, $scope, $location){

    $('svg').on('click', '> g', function(){
        var abbreviation = $(this).attr('id');
        console.log(abbreviation);
        $location.path("/table/" + abbreviation);
    });
});
