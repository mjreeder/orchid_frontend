app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, Bloom_CommentFactory, TagFactory){

    $scope.plant = {};
    $scope.health_condition = "";

    $scope.$on('current-plant', function(event, data){
      cleanPrefixes();
      $scope.plant = data;
      concatObjects(data, 'plant');
      init();
    })

    var cleanPrefixes = function(){
      cleanPrefix('plant');
      cleanPrefix('blooming');
      cleanPrefix('bloomingComment');
      cleanPrefix('sprayed');
      cleanPrefix('potting');
      cleanPrefix('health');
      cleanPrefix('flag');
    }

    var cleanPrefix = function(prefix){
      var data = $scope;
      for(key in data){
        if(data.hasOwnProperty(key)){
          if(stringContains(key, prefix)){
            $scope[key] = undefined;
          }
        }
      }
    }

    $scope.today = new Date();

    $scope.submitPopUp = function(){
      handleBloom();
      handleBloomingComment();
      handleSprayed();
      handlePotting();
      handleHealth();
      handleTag();
    }

    var handleBloom = function() {
      var data = prepareForFactory('blooming');
      if(objectIsNew('blooming')){
        BloomingFactory.createBloom(data).then(function(){})
      } else {
        BloomingFactory.updateBloom(data).then(function(){})
      }
    }

    var handleBloomingComment = function(){
      var data = prepareForFactory('bloomingComment');
      if(!data.note){
        return;
      }
      data.timestamp = $scope.today;
      Bloom_CommentFactory.createBloom_Comment(data).then(function(){})
    }

    var handleSprayed = function() {
      var data = prepareForFactory('sprayed');
      data.timestamp = $scope.today;
      if(!data.note){
        return;
      }
      if(objectIsNew('sprayed')){
        SprayedFactory.createSplit(data).then(function(){})
      } else {
        SprayedFactory.updateSplit(data).then(function(){})
      }
    }

    var handlePotting = function(){
      var data = prepareForFactory('potting');
      if(objectIsNew('potting')){
        PottingFactory.createPest(data).then(function(){})
      } else {
        PottingFactory.updatePotting(data).then(function(){})
      }
    }

    var handleHealth = function(){
      var data = prepareForFactory('health');
      data.timestamp = $scope.today;
      if(!data.score || !data.comment){
        return;
      }
      if(objectIsNew('health')){
        HealthFactory.createHealth(data).then(function(){});
      } else {
        HealthFactory.editHealth(data).then(function(){})
      }
    }

    var handleTag = function(){
      var data = prepareForFactory('flag');
      if(!$scope.flagged){
        return;
      }
      if(objectIsNew('flag')){
        TagFactory.createTag(data).then(function(){})
      } else {
        TagFactory.updateTag(data).then(function(){})
      }
    }

    var prepareForFactory = function(field){
      var data = extractData(field);
      console.log($scope['plant_id']);
      if(!objectIsNew('plant')){
        data.plantId = $scope.plant.id;
      }
      return data;
    }

    var objectIsNew = function(object){
      if($scope[object + '_id']){
        return false;
      } else {
        return true;
      }
    }

    $scope.closePopUp = function(){
      $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function(){
      if(!objectIsNew('plant')){
        handleBloomInit();
        handleSprayedInit();
        handlePottingInit();
        handleHealthInit();
        handleTagInit();
        handleBloomingCommentInit();
      }
    }

    var handleBloomInit = function(){
      BloomingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        var data = getLastComment(data);
        data = formatTimeStamp('start_date', data);
        if(!data){
          return;
        }
        if(data.end_date){
          console.log("end date");
          data = formatTimeStamp('end_date', data);
        }
        if(data.end_date == "0000-00-00"){
          data.end_date = null;
        }
        concatObjects(data, 'blooming');
      })
    }

    var handleSprayedInit = function(){
      SprayedFactory.getPestByPlantID($scope.plant.id).then(function(data){
        var lastComment = getLastComment(data);
        lastComment = formatTimeStamp('timestamp', lastComment);
        concatObjects(lastComment, 'sprayed');
      })
    }

    var handlePottingInit = function(){
      PottingFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        var lastComment = getLastComment(data);
        lastComment = formatTimeStamp('timestamp', lastComment);
        concatObjects(lastComment, 'potting');
      })
    }

    var handleHealthInit = function(){
      HealthFactory.getHealthBtPlantID($scope.plant.id).then(function(data){
        var lastComment = getLastComment(data);
        console.log(lastComment);
        lastComment = formatTimeStamp('timestamp', lastComment);
        concatObjects(lastComment, 'health');
      })
    }

    var handleTagInit = function(){
      TagFactory.getPestByPlantID($scope.plant.id).then(function(data){
        data = data.data.data;
        console.log(data.active);
        if(data.active == 1){
          $scope.flagged = true;
        }
        concatObjects(data, 'flag');
      })
    }

    var handleBloomingCommentInit = function(){
      Bloom_CommentFactory.getBloomByPlantID($scope.plant.id).then(function(data){
        var lastComment = getLastComment(data);
        concatObjects(lastComment, 'bloomingComment')
      })
    }

    //The calendar type input fields will throw an error if not a date object
    var formatTimeStamp = function(variable, data){
      if(!data){
        return;
      }
      var stringVal = data[variable];
      stringVal = stringVal.split('-');
      for(var i = 0; i < stringVal.length; i++){
        var currentItem = stringVal[i];
        if(currentItem[0] == '0'){
          stringVal[i] = currentItem.substring(1, currentItem.length);
        }
      }
      stringVal[1] = parseInt(stringVal[1] - 1);
      var formattedDate = new Date(stringVal[0], stringVal[1], stringVal[2]);
      data[variable] = formattedDate;
      return data;
    }

    var getLastComment = function(data){
      data = data.data.data;
      var lastComment = data[data.length-1];
      return lastComment;
    }

    //Add data to scope object
    var concatObjects = function(data, prefix){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope[prefix + '_' + key] = data[key];
        }
      }
    }

    //get all items which have the current prefix in the scope.data object
    var extractData = function(prefix){
      var data = $scope;
      var temp = {};
      for(key in data){
        if(data.hasOwnProperty(key)){
          if(stringContains(key, prefix)){
            var tempKey = removePrefix(key);
            temp[tempKey] = data[key];
          }
        }
      }
      return temp;
    }

    var stringContains = function(string, prefix){
      if(string.indexOf(prefix) !== -1){
        return true;
      } else {
        return false;
      }
    }

    var removePrefix = function(string){
      var index = string.indexOf('_');
      return string.substring(index + 1, string.length);
    }

});
