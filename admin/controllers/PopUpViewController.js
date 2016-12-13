//This page stores the old data on init in $scope.data, but all assignments are to $scope . Breaking this flow will make the check to see if an item is new fail.

app.controller('PopUpViewController', function(CONFIG, $scope, $location, $rootScope, BloomingFactory, SprayedFactory, PottingFactory, HealthFactory, Bloom_CommentFactory, TagFactory, $route) {

    $scope.plant = {};
    $scope.flagWasDisabled = false;
    $scope.createBloomPressed = false;
    $scope.startNewBloomTodayDisable = true;
    $scope.disableEndBloom = true;
    $scope.bloomIsActive = false;
    $scope.newBloomText = "Start New Bloom";
    $scope.today = new Date();

    //TODO these variables do not follow the structure of the page
    var createTag = false;
    $scope.flagggedPlant = [];
    $scope.taggedPlant = [];

    $scope.startNewBloom = function() {
        $scope.blooming_start_date = $scope.today;
        $scope.blooming_end_date = null;
        $scope.disableEndBloom = true;
        $scope.createBloomPressed = true;
        $scope.startNewBloomTodayDisable = false;
        $scope.bloomIsActive = true;
        $scope.newBloomText = "In Bloom";
    }

    $scope.$on('current-plant', function(event, data) {
        destroy();
        $scope.plant = data;
        $scope.data = {};
        concatObjects(data, 'plant');
        init();
    })

    var destroy = function() {
        cleanPrefixes();
        $scope.disableEndBloom = false;
        $scope.flagWasDisabled = false;
        $scope.createBloomPressed = false;
        $scope.startNewBloomTodayDisable = true;
        $scope.disableEndBloom = true;
        $scope.bloomIsActive = false;
        $scope.newBloomText = "Start New Bloom";
        $scope.flagged = false;

        //TODO these variables do not follow the structure of the page
        var createTag = false;
        $scope.flagggedPlant = [];
        $scope.taggedPlant = [];
    }

    var cleanPrefixes = function() {
        cleanPrefix('plant');
        cleanPrefix('blooming');
        cleanPrefix('bloomingComment');
        cleanPrefix('sprayed');
        cleanPrefix('potting');
        cleanPrefix('health');
        cleanPrefix('flag');
    }

    var cleanPrefix = function(prefix) {
        var data = $scope;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                if (stringContains(key, prefix)) {
                    $scope[key] = undefined;
                }
            }
        }
    }

    $scope.submitPopUp = function(callback) {
        if (!bloomDateIsValid()) {
            alert('There must be 7 days between the bloom start and end!');
            return;
        }
        if(bloomsOverlap() && $scope.createBloomPressed){
            alert('Blooms are not allowed to overlap!');
            return;
        }
        if(bloomStartsInFuture()){
          alert('Bloom cannot start in the future!');
          return;
        }
        if (!callback) {
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
        handleTag(function() {
            $route.reload();
        });
        $scope.closePopUp();
    }

    var syncNetwork = function(callback) {
        handleBloom(function() {
            handleSprayed(function() {
                handleBloomingComment(function() {
                    handlePotting(function() {
                        handleHealth(function() {
                            handleTag(function() {
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
        data.start_date = convertDateToString(data.start_date);
        if (objectIsNew('blooming') || $scope.createBloomPressed) {
            BloomingFactory.createBloom(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        } else {
            BloomingFactory.updateBloom(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        }
    }

    var convertDateToString = function(date){
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getYear();
      return year + "-" + month + "-" + day;
    }

    var bloomsOverlap = function() {
      var oldBloom = $scope.data.blooming_end_date;
      var newBloom = $scope.blooming_start_date;
      if(!$scope.data || !oldBloom){
        return false;
      }
      oldBloom = moment(oldBloom);
      newBloom = moment(newBloom);
      if(oldBloom.isAfter(newBloom)){
        return true;
      } else {
        return false;
      }
    }

    var bloomStartsInFuture = function() {
      var today = $scope.today;
      var bloomStart = $scope.blooming_start_date;
      console.log($scope.blooming_start_date);
      today = moment($scope.today);
      bloomStart = moment($scope.bloomStart);
      console.log(bloomStart.isAfter(today));
      if(bloomStart.isAfter(today, 'day')){
        return true;
      } else {
        return false;
      }
    }

    var bloomDateIsValid = function() {
        if ($scope.blooming_end_date == null) {
            return true;
        }
        var start = moment($scope.blooming_start_date);
        var end = moment($scope.blooming_end_date);
        var startYearDate = start.dayOfYear();
        var endYearDate = end.dayOfYear();
        return daysBetweenDates(startYearDate, endYearDate, 7);
    }

    var daysBetweenDates = function(startYearDate, endYearDate, days) {
        if (!isLeapYear()) {
            if ((endYearDate - startYearDate >= days) || (datesFromNewYear(startYearDate, endYearDate, 365) >= days)) {
                return true;
            }
        } else {
            if ((endYearDate - startYearDate >= days) || (datesFromNewYear(startYearDate, endYearDate, 366) >= days)) {
                return true;
            }
        }
        return false;
    }

    var datesFromNewYear = function(startYearDate, endYearDate, daysInYear) {
        var startYear = moment($scope.blooming_start_date);
        var endYear = moment($scope.blooming_end_date);
        if (endYear < startYear) {
            return 0
        } else if (startYearDate > endYearDate) {
            return daysInYear - startYearDate + endYearDate;
        }
        return 0;
    }

    //Year calculation from: http://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
    var isLeapYear = function() {
        var yearNumber = moment($scope.blooming_start_date).year();
        return ((yearNumber % 4 == 0) && (yearNumber % 100 != 0)) || (yearNumber % 400 == 0);
    }

    var handleBloomingComment = function(callback) {
        var data = prepareForFactory('bloomingComment');
        if (!data.note) {
            if (callback) {
                callback();
            }
            return;
        }
        if (!data.timestamp) {
            data.timestamp = $scope.today;
        }
        var isRecent = checkForRecent($scope.blooming_start_date);
        if (objectsMatch('bloomingComment')) {
            if (callback) {
                callback();
            }
            return;
        }
        if (objectIsNew('bloomingComment') || (!isRecent)) {
            Bloom_CommentFactory.createBloom_Comment(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        } else {
            Bloom_CommentFactory.updateBloom_Comment(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        }
    }

    var checkForRecent = function(day) {
        var start = moment(day);
        var end = moment($scope.today);
        var startYearDate = start.dayOfYear();
        var endYearDate = end.dayOfYear();
        var isRecent = daysBetweenDates(startYearDate, endYearDate, 7);
        return isRecent;
    }

    var handleSprayed = function(callback) {
        var data = prepareForFactory('sprayed');
        if (!data.note) {
            data.note = ""
        }
        if (!data.timestamp) {
            data.timestamp = $scope.today;
        }
        var isRecent = checkForRecent($scope.sprayed_timestamp);
        if (objectsMatch('sprayed')) {
            if (callback) {
                callback();
            }
            return;
        }
        if (objectIsNew('sprayed') || (!isRecent)) {
            SprayedFactory.createSplit(data).then(function(response) {
                if (callback) {
                    callback();
                }
            });
        } else {
            SprayedFactory.updateSplit(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        }
    }

    var handlePotting = function(callback) {
        var data = prepareForFactory('potting');
        var isRecent = checkForRecent($scope.potting_timestamp);
        if (objectsMatch('potting')) {
            if (callback) {
                callback();
            }
            return;
        }
        if (objectIsNew('potting') || (!isRecent)) {
            PottingFactory.createPest(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        } else {
            PottingFactory.updatePotting(data).then(function() {
                if (callback) {
                    callback();
                }
            })
        }
    }

    var handleHealth = function(callback) {
        var data = prepareForFactory('health');
        if (!data.score) {
            if (callback) {
                callback();
            }
            return;
        }
        if (!data.comment) {
            data.comment = "";
        }
        if (!data.timestamp) {
            data.timestamp = $scope.today;
        }
        var isRecent = checkForRecent($scope.health_timestamp);
        if (objectsMatch('health')) {
            if (callback) {
                callback();
            }
            return;
        }
        HealthFactory.createHealth(data).then(function() {
            if (callback) {
                callback();
            }
        });
    }

    var handleTag = function(callback) {
        if ($scope.flag_note) {
            $scope.taggedPlant[0].note = $scope.flag_note;
        } else {
            $scope.taggedPlant[0].note = "";
        }
        if (createTag == false) {
            TagFactory.updateTag($scope.taggedPlant[0]).then(function(response) {
                if (callback) {
                    callback();
                }
            })
        } else {
            TagFactory.createTag($scope.taggedPlant[0]).then(function(response) {
                if (callback) {
                    callback();
                }
            })
        }
    }

    var objectsMatch = function(field) {
        var newData = extractData(field);
        var oldData = extractData(field, $scope.data);
        return _.isEqual(newData, oldData);
    }

    var prepareForFactory = function(field) {
        var data = extractData(field);
        if (!objectIsNew('plant')) {
            data.plantId = $scope.plant.id;
        }
        return data;
    }

    var objectIsNew = function(object) {
        if ($scope[object + '_id']) {
            return false;
        } else {
            return true;
        }
    }

    $scope.closePopUp = function() {
        $rootScope.$broadcast('popup-close', true);
    }

    //These requests are async, but since they do not equire each other's data we will execute them concurently
    var init = function() {
        $scope.data = {};
        if (!objectIsNew('plant')) {
            handleBloomInit();
            handleSprayedInit();
            handlePottingInit();
            handleHealthInit();
            handleTagInit();
            handleBloomingCommentInit();
        }
    }

    var handleBloomInit = function() {
        BloomingFactory.getBloomByPlantID($scope.plant.id).then(function(data) {
            var data = getLastComment(data);
            data = formatTimeStamp('start_date', data);
            if (!data) {
                return;
            }
            if (data.end_date == "0000-00-00") {
                data.end_date = null;
            }
            if (data.end_date) {
                data = formatTimeStamp('end_date', data);
            }
            concatObjects(data, 'blooming');
            setTodayEndBloomState();
            disableNewBloomToday();
            setBloomingState();
        })
    }

    var setBloomingState = function() {
        if (!$scope.blooming_end_date) {
            $scope.bloomIsActive = true;
            $scope.newBloomText = "In Bloom";
        }
    }

    var disableNewBloomToday = function() {
        if (objectIsNew('blooming')) {
            $scope.startNewBloomTodayDisable = true;
            $scope.disableEndBloom = true;
        } else {
            $scope.startNewBloomTodayDisable = false;
            $scope.disableEndBloom = false;
        }
    }

    var handleSprayedInit = function() {
        SprayedFactory.getPestByPlantID($scope.plant.id).then(function(data) {
            var lastComment = getLastComment(data);
            lastComment = formatTimeStamp('timestamp', lastComment);
            concatObjects(lastComment, 'sprayed');
        })
    }

    var handlePottingInit = function() {
        PottingFactory.getBloomByPlantID($scope.plant.id).then(function(data) {
            var lastComment = getLastComment(data);
            lastComment = formatTimeStamp('timestamp', lastComment);
            concatObjects(lastComment, 'potting');
        })
    }

    var handleHealthInit = function() {
        HealthFactory.getHealthBtPlantID($scope.plant.id).then(function(data) {
            var lastComment = getLastComment(data);
            lastComment = formatTimeStamp('timestamp', lastComment);
            concatObjects(lastComment, 'health');
        })
    }

    var handleTagInit = function() {
        $scope.taggedPlant = [];
        TagFactory.getPestByPlantID($scope.plant.id).then(function(data) {
            var data2 = data.data.data;
            //CHECK IF THERE IS DATA TO READ IN
            if (data2 != "") {
                $scope.taggedPlant.push(data2);
                createTag = false;
                if (data2.active == 1) {
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

    var handleBloomingCommentInit = function() {
        Bloom_CommentFactory.getBloomByPlantID($scope.plant.id).then(function(data) {
            var lastComment = getLastComment(data);
            concatObjects(lastComment, 'bloomingComment')
        })
    }

    //The calendar type input fields will throw an error if not a date object
    var formatTimeStamp = function(variable, data) {
        if (!data) {
            return;
        }
        var stringVal = data[variable];
        var temp = moment(stringVal);
        var formattedDate = temp.toDate();
        data[variable] = formattedDate;
        return data;
    }

    var getLastComment = function(data, timeStampsReversed) {
        if (!timeStampsReversed) {
            timeStampsReversed = false;
        }
        var lastComment = "";
        if (timeStampsReversed) {
            data = data.data.data;
            lastComment = data[data.length - 1];
            return lastComment;
        } else {
            data = data.data.data;
            lastComment = data[0];
            return lastComment;
        }
    }

    //Add data to scope object
    var concatObjects = function(data, prefix) {
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                $scope[prefix + '_' + key] = data[key];
                $scope.data[prefix + '_' + key] = data[key];
            }
        }
    }

    //get all items which have the current prefix in the scope.data object
    var extractData = function(prefix, data) {
        if (data == undefined) {
            data = $scope;
        }
        var temp = {};
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                if (stringContains(key, prefix)) {
                    var tempKey = removePrefix(key);
                    temp[tempKey] = data[key];
                }
            }
        }
        return temp;
    }

    var stringContains = function(string, prefix) {
        prefix += "_"
        if (string.indexOf(prefix) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    var removePrefix = function(string) {
        var index = string.indexOf('_');
        return string.substring(index + 1, string.length);
    }

    var setTodayEndBloomState = function() {
        var startDate = moment($scope.blooming_start_date);
        var today = moment();
        if ((startDate.dayOfYear() == today.dayOfYear()) && (today.year() == startDate.year())) {
            $scope.disableEndBloom = true;
        }
    }

    $scope.disableFlag = function() {
        var plant_id = $scope.plant.id;
        $scope.flagWasDisabled = false;
        if ($scope.taggedPlant.length == 1) {
            if ($scope.flagged) {
                $scope.taggedPlant[0].active = 1;
            }
            if (!$scope.flagged) {
                $scope.taggedPlant[0].active = 0;
            }
        }
    }

    $scope.moreInfo = function() {
        $scope.submitPopUp(function() {
            var dest = "/plant/" + $scope.plant_accession_number;
            $location.url(dest);
        });
    }

});
