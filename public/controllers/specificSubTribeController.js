orchidApp.controller('specificSubTribeController', function($scope, $location, $state, $stateParams, PlantsFactory) {

    $scope.NAMEOFPAGE = $stateParams.tribe;

    $scope.tribes = [];
    $scope.tribes.push({name:"tribe1"});
    $scope.tribes.push({name:"tribe2"});
    $scope.tribes.push({name:"tribe3"});
    $scope.tribes.push({name:"tribe4"});
    $scope.tribes.push({name:"tribe5"});
    $scope.tribes.push({name:"tribe6"});


    $scope.collectionOfItems = [];

    $scope.collectionOfItems.push({name:"HELP", accession_number: 4455});
    $scope.collectionOfItems.push({name:"HELP"});
    $scope.collectionOfItems.push({name:"HELP"});
    $scope.collectionOfItems.push({name:"HELP"});
    $scope.collectionOfItems.push({name:"HELP"});
    $scope.collectionOfItems.push({name:"HELP"});

    for(var i =0; i < $scope.tribes.length; i++){
        if($scope.NAMEOFPAGE == $scope.tribes[i].name){
            //$scope.contineLoading();
            console.log('we are good');
            break;
        } else {
            console.log('go home');

            //$location.path('/404');
        }
    }


    $scope.moveTo = function(item){
        $location.path('/plant/' + item.accession_number);
    }



});