app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory){

    $scope.plant = {};

    $scope.$on('current-plant', function(event, data){
      console.log(data);
      $scope.plant = data;
      init();
    })

    $scope.today = new Date();

    $scope.submitPopUp = function(){
        console.log("HELLO");
        $location.path('#/search');
    }

    $scope.closePopUp = function(){
      $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function(){
      BloomingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data);
      })
      SprayedFactory.getPestByPlantID($scope.plant.id).then(function(data){
        concatObjects(data);
      })
      PottingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data);
      })
      HealthFactory.getHealthBtPlantID($scope.plant.id).then(function(data){
        concatObjects(data);
      })
    }

    //Add data to scope object
    var concatObjects = function(data){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope[key] = data[key];
        }
      }
    }



});
