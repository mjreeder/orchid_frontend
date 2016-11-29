orchidApp.controller('plantController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.NAMEOFPAGE = $stateParams.accession_number;

    $scope.noPlant = false;
    $scope.plantInformation = "";
    $scope.photoInformation = "";
    $scope.url = "";
    $scope.plant = {};

    if($scope.NAMEOFPAGE == ""){
        console.log('there is nothing to display');
    } else {
        PlantsFactory.specificCommonName($scope.NAMEOFPAGE).then(function (response) {
            console.log(response);
            if (response.data.data[0] == false) {
                $scope.noPlant = false;
                //route to 404 if not found
                $location.path('/404');
            } else {

                $scope.noPlant = true;
                $scope.plantInformation = response.data.data[0];

                $scope.createPlant();
            }
        });


    }

    $scope.createPlant = function(){
        console.log($scope.plantInformation);
        $scope.plant = {
            'id': $scope.plantInformation.id,

            'class_name' : $scope.plantInformation.class_name,
            'species_name' : $scope.plantInformation.species_name,
            'variety_name' : $scope.plantInformation.variety_name,
            'subtribe_name' : $scope.plantInformation.subtribe_name,
            'tribe_name' : $scope.plantInformation.tribe_name,
            'genus_name' : $scope.plantInformation.genus_name,

            'parent_one' : $scope.plantInformation.parent_one,
            'parent_two' : $scope.plantInformation.parent_two,
            'grex_status' : $scope.plantInformation.grex_status,
            'hybrid_status' : $scope.plantInformation.hybrid_status,

            'description' : $scope.plantInformation.description,
            'culture' : $scope.plantInformation.culture
        };

        PhotoFactory.getPhtosByPlantID($scope.plant.id).then(function (response){
            $scope.photoInformation = response.data.data;
            console.log(response.data.data);
            $scope.url = $scope.photoInformation[1].url;

        });

        //for(var i = 0; i < $scope.photoInformation.length; i++){
        //
        //}





    };



    console.log("WE ARE AT THE PLANT VIEW CONTROLLER");


});