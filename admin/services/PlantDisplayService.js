app.service('PlantDisplayService', function($rootScope) {

  //function to create the bloom graph
  this.filterPlantAttributes = function(plantHttpResponse, displayAttributes) {
    var plants = [];
    for (var i = 0; i < plantHttpResponse.data.data.plants.length; i++) {
      var plant = [];
      var attributes = Object.keys(plantHttpResponse.data.data.plants[i]);
      for (var j = 0; j < attributes.length; j++) {
        var val = attributes[j];
        //attributeReplace is for grabbing dual words such as scientific_name
        var attributeReplace = attributes[j].replace(/[^a-zA-Z ]/g, " ");
        if (attributes[j] == 'accession_number' || attributes[j] == 'name' || displayAttributes.indexOf(attributeReplace) !== -1) {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': plantHttpResponse.data.data.plants[i][val],
            'isDisplayed': true
          }
        } else {
          var attribute = {
            'key': attributes[j].replace(/[^a-zA-Z ]/g, " "),
            'val': plantHttpResponse.data.data.plants[i][val],
            'isDisplayed': false
          }
        }
        plant.push(attribute);
      }
      plants.push(plant);
    }
    return plants;
  }
});
