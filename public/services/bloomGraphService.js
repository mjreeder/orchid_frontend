orchidApp.service('bloomService', function($rootScope) {

  //function to create the bloom graph
  this.loadBloomGraphData = function(blooms, year) {
    var bloomData = blooms.map(function(bloomObj) {
      if (bloomObj.end_date !== "0000-00-00" && bloomObj.end_date !== "present") {
        var timeLineBloom = {
          start: bloomObj.start_date,
          end: bloomObj.end_date,
          className: "full_bloom"
        };
      } else {
        var timeLineBloom = {
          start: bloomObj.start_date,
          className: "incomplete_bloom"
        };
      }
      return timeLineBloom
    });

    var maxDate = new Date("December 31, " + year.year + " 12:00:00");
    var minDate = new Date("January 1, " + year.year + " 12:00:00");
    var testMin = moment(minDate).format("MM/DD/YYYY");
    var testMax = moment(maxDate).format("MM/DD/YYYY");

    var options = {
      selectable: false,
      editable: false,
      stack: false,
      min: minDate,
      max: maxDate
    };

    var bloomGraphData = {
      "data": bloomData,
      "options": options
    };

    return bloomGraphData;
  }
});
