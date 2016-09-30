app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory){

    $scope.plant = {};
    $scope.health_condition = "";

    $scope.$on('current-plant', function(event, data){
      console.log(data);
      $scope.plant = data;
      init();
    })

    $scope.today = new Date();

    $scope.submitPopUp = function(){

    }

    $scope.closePopUp = function(){
      $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function(){
      BloomingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'blooming');
      })
      SprayedFactory.getPestByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'sprayed');
      })
      PottingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'potting');
      })
      HealthFactory.getHealthBtPlantID($scope.plant.id).then(function(data){
        concatObjects(data, 'health');
      })
    }

    $scope.star

    //Add data to scope object
    var concatObjects = function(data, prefix){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope[prefix + '_' + key] = data[key];
        }
      }
    }



});
