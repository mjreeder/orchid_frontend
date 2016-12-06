orchidApp.controller('plantController', function($scope, $location, $state, $stateParams, PlantsFactory, PhotoFactory) {

    $scope.NAMEOFPAGE = $stateParams.accession_number;

    $scope.noPlant = false;
    $scope.plantInformation = "";
    $scope.photoInformation = [];
    $scope.url = "";
    $scope.plant = {};

    $scope.allimagesURL =[];


    console.log($scope.NAMEOFPAGE);
        PlantsFactory.getPlantByAccessionNumber($scope.NAMEOFPAGE).then(function (response) {
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
        }, function (error) {

            console.log("404");
        });


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

        PhotoFactory.getPhotosByPlantID($scope.plant.id).then(function (response){
            console.log(response);

            var data = response.data.data;
            for(var i = 0; i < data.length; i ++){
                $scope.allimagesURL.push(data[i].url);
            }

        });
        



        for(var i = 0; i < $scope.photoInformation.length; i++){
            console.log($scope.photoInformation[i].url);
            allimagesURL.add($scope.photoInformation[i].url);
        }

        console.log($scope.allimagesURL.length);
        for(var i = 0; i < $scope.allimagesURL.length; i++){
           console.log($scope.allimagesURL[i]);
        }
    };

    $scope.goBack = function() {
        window.history.back();
    }

    var myIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}
        x[myIndex-1].style.display = "block";
        setTimeout(carousel, 2000); // Change image every 2 seconds
    }


    console.log("WE ARE AT THE PLANT VIEW CONTROLLER");


});