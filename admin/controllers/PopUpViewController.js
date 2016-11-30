app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, Bloom_CommentFactory, TagFactory){

    $scope.plant = {};
    $scope.flagWasDisabled = false;
    $scope.createBloomPressed = false;
    $scope.startNewBloomTodayDisable = true;
    $scope.disableEndBloom = true;

    $scope.startNewBloom = function(){
      $scope.blooming_start_date = $scope.today;
      $scope.blooming_end_date = null;
      $scope.disableEndBloom = true;
      $scope.createBloomPressed = true;
      $scope.startNewBloomTodayDisable = false;
    }

    $scope.$on('current-plant', function(event, data){
      destroy();
      $scope.plant = data;
      $scope.data = {};
      concatObjects(data, 'plant');
      init();
    })

    var destroy = function(){
      cleanPrefixes();
      $scope.disableEndBloom = false;
      $scope.flagWasDisabled = false;
      $scope.createBloomPressed = false;
      $scope.startNewBloomTodayDisable = true;
      $scope.disableEndBloom = true;
    }

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

    $scope.submitPopUp = function(callback){
      if(!bloomDateIsValid()){
        alert('There must be 7 days between the bloom start and end!');
        return;
      }
      if(!callback){
        asyncNetwork();
      } else {
        syncNetwork(callback);
      }
    }

    var asyncNetwork = function() {
      handleBloom();
      handleBloomingComment();
      handleSprayed();
      handlePotting();
      handleHealth();
      handleTag();
      $scope.closePopUp();
    }

    var syncNetwork = function(callback) {
      handleBloom(function(){
        handleSprayed(function(){
          handleBloomingComment(function(){
            handlePotting(function(){
              handleHealth(function(){
                handleTag(function(){
                  $scope.closePopUp();
                  callback();
                })
              })
            })
          })
        })
      })
    }

    var handleBloom = function(callback) {
      var data = prepareForFactory('blooming');
      if(objectIsNew('blooming') || $scope.createBloomPressed){
        BloomingFactory.createBloom(data).then(function(){
          if(callback){
            callback();
          }
        })
      } else {
        BloomingFactory.updateBloom(data).then(function(){
          if(callback){
            callback();
          }
        })
      }
    }

    var bloomDateIsValid = function() {
      if($scope.blooming_end_date == null){
        return true;
      }
      var start = moment($scope.blooming_start_date);
      var end = moment($scope.blooming_end_date);
      var startYearDate = start.dayOfYear();
      var endYearDate = end.dayOfYear();
      return daysBetweenDates(startYearDate, endYearDate, 7);
    }

    var daysBetweenDates = function(startYearDate, endYearDate, days) {
      if(!isLeapYear()){
        if((endYearDate - startYearDate >= days) || (datesFromNewYear(startYearDate, endYearDate, 365) >= days)){
          return true;
        }
      } else {
        if((endYearDate - startYearDate >= days) || (datesFromNewYear(startYearDate, endYearDate, 366) >= days)){
          return true;
        }
      }
      return false;
    }

    var datesFromNewYear = function(startYearDate, endYearDate, daysInYear) {
      if(startYearDate > endYearDate){
        return daysInYear - startYearDate + endYearDate;
      }
      return 0;
    }

    //Year calculation from: http://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
    var isLeapYear = function() {
      var yearNumber = moment($scope.blooming_start_date).year();
      return ((yearNumber % 4 == 0) && (yearNumber % 100 != 0)) || (yearNumber % 400 == 0);
    }

    var handleBloomingComment = function(callback){
      var data = prepareForFactory('bloomingComment');
      if(!data.note){
        if(callback){
          callback();
        }
        return;
      }
      if(!data.timestamp){
        data.timestamp = $scope.today;
      }
      var isRecent = checkForRecent($scope.blooming_start_date);
      if(objectsMatch('bloomingComment')){
        return;
      }
      if(objectIsNew('bloomingComment') || (!isRecent)){
        Bloom_CommentFactory.createBloom_Comment(data).then(function(){
          if(callback){
            callback();
          }
        })
      } else {
        Bloom_CommentFactory.updateBloom_Comment(data).then(function(){
          if(callback){
            callback();
          }
        })
      }
    }

    var checkForRecent = function(day){
      var start = moment(day);
      var end = moment($scope.today);
      var startYearDate = start.dayOfYear();
      var endYearDate = end.dayOfYear();
      var isRecent = daysBetweenDates(startYearDate, endYearDate, 7);
      return isRecent;
    }

    var handleSprayed = function(callback) {
      var data = prepareForFactory('sprayed');
      if(!data.note){
        if(callback){
          callback();
        }
        return;
      }
      if(!data.timestamp){
        data.timestamp = $scope.today;
      }
      var isRecent = checkForRecent($scope.sprayed_timestamp);
      if(objectsMatch('sprayed')){
        if(callback){
          callback();
        }
        return;
      }
      if(objectIsNew('sprayed') || (!isRecent)){
        SprayedFactory.createSplit(data).then(function(response){
          if(callback){
            callback();
          }
        });
      } else {
        SprayedFactory.updateSplit(data).then(function(){
          if(callback){
            callback();
          }
        })
      }
    }

    var handlePotting = function(callback){
      var data = prepareForFactory('potting');
      var isRecent = checkForRecent($scope.potting_timestamp);
      if(objectsMatch('potting')){
        if(callback){
          callback();
        }
        return;
      }
      if(objectIsNew('potting') || (!isRecent)){
        PottingFactory.createPest(data).then(function(){
          if(callback){
            callback();
          }
        })
      } else {
        PottingFactory.updatePotting(data).then(function(){
          if(callback){
            callback();
          }
        })
      }
    }

    var handleHealth = function(callback){
      var data = prepareForFactory('health');
      if(!data.score || !data.comment){
        if(callback){
          callback();
        }
        return;
      }
      if(!data.timestamp){
        data.timestamp = $scope.today;
      }
      var isRecent = checkForRecent($scope.health_timestamp);
      if(objectsMatch('health')){
        if(callback){
          callback();
        }
        return;
      }
      if(objectIsNew('health') || (!isRecent)){
        HealthFactory.createHealth(data).then(function(){
          if(callback){
            callback();
          }
        });
      } else {
        HealthFactory.editHealth(data).then(function(){
          if(callback){
            callback();
          }
        })
      }
    }

    var createTag = false;

    $scope.flagggedPlant = [];
    var handleTag = function(callback){
        $scope.taggedPlant[0].note  = $scope.flag_note;
        if(createTag == false){
            TagFactory.updateTag($scope.taggedPlant[0]).then(function (response){
              if(callback){
                callback();
              }
            })
        } else {
            TagFactory.createTag($scope.taggedPlant[0]).then(function(response){
              if(callback){
                callback();
              }
            })
        }
    }

    var objectsMatch = function(field){
      var newData = extractData(field);
      var oldData = extractData(field, $scope.data);
      return _.isEqual(newData, oldData);
    }

    var prepareForFactory = function(field){
      var data = extractData(field);
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
      $scope.data = {};
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
        if(data.end_date == "0000-00-00"){
          data.end_date = null;
        }
        if(data.end_date){
          data = formatTimeStamp('end_date', data);
        }
        concatObjects(data, 'blooming');
        setTodayEndBloomState();
        disableNewBloomToday();
      })
    }

    var disableNewBloomToday = function(){
      if(objectIsNew('blooming')){
        $scope.startNewBloomTodayDisable = true;
        $scope.disableEndBloom = true;
      } else {
        $scope.startNewBloomTodayDisable = false;
        $scope.disableEndBloom = false;
      }
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
        lastComment = formatTimeStamp('timestamp', lastComment);
        concatObjects(lastComment, 'health');
      })
    }

    $scope.taggedPlant = [];
    var handleTagInit = function(){
        $scope.taggedPlant = [];
      TagFactory.getPestByPlantID($scope.plant.id).then(function(data){
          var data2 = data.data.data;
          //CHECK IF THERE IS DATA TO READ IN
          if(data2 != ""){
              $scope.taggedPlant.push(data2);
              createTag = false;
              if(data2.active == 1){
                  $scope.flagged = true;
                  $scope.flag_note = data2.note;
              } else {
                  $scope.flagged = false;
                  $scope.flag_note = data2.note;
                  return;
              }
          } else {
              createTag = true;
              $scope.taggedPlant.push({
                  plant_id: $scope.plant.id,
                  active: 0,
                  note: ""
              });
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
      var lastComment = data[0];
      return lastComment;
    }

    //Add data to scope object
    var concatObjects = function(data, prefix){
      for(key in data){
        if(data.hasOwnProperty(key)){
          $scope[prefix + '_' + key] = data[key];
          $scope.data[prefix + '_' + key] = data[key];
        }
      }
    }

    //get all items which have the current prefix in the scope.data object
    var extractData = function(prefix, data){
      if(data == undefined){
        data = $scope;
      }
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
      prefix += "_"
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

    var setTodayEndBloomState = function(){
      var startDate = moment($scope.blooming_start_date);
      var today = moment();
      if((startDate.dayOfYear() == today.dayOfYear()) && (today.year() == startDate.year())){
        $scope.disableEndBloom = true;
      }
    }

    $scope.disableFlag = function(){
      var plant_id = $scope.plant.id;
        $scope.flagWasDisabled = false;
        if($scope.taggedPlant.length == 1){
            if($scope.flagged){
                $scope.taggedPlant[0].active = 1;
            }
            if(!$scope.flagged){
                $scope.taggedPlant[0].active = 0;
            }
        }
    }

    $scope.moreInfo = function(){
      $scope.submitPopUp(function(){
        var dest = "/plant/" + $scope.plant_accession_number;
        $location.url(dest);
      });
    }

});
