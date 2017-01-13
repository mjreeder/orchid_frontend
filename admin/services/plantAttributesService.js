app.service('plantAttributesService', function($rootScope) {

  this.placePlantAttributes = function(response, displayAttributes) {
    var plants = [];
    for (var i = 0; i < response.data.data.plants.length; i++) {
      var plant = [];
      var attributes = Object.keys(response.data.data.plants[i]);
      for (var j = 0; j < attributes.length; j++) {
        var val = attributes[j];
        //attributeReplace is for grabbing dual words such as scientific_name
        var attributeReplace = attributes[j].replace(/[^a-zA-Z ]/g, " ");
        if (attributes[j] == 'accession_number') {
          attributes[j] = 'Accession #';
        }
        if (attributes[j] == 'grex hybrid') {
          attributes[j] = 'grex/hybrid';
        }
        if (attributes[j] == 'variety grex') {
          attributes[j] = 'variety/grex';
        }
        var attribute = {
          'key': attributes[j],
          'val': response.data.data.plants[i][val],
          'isDisplayed': true
        }
        plant.push(attribute);
      }
      plants.push(plant);
    }
    return plants;
  }
});
