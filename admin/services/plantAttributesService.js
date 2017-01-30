app.service('plantAttributesService', function($rootScope) {

  this.placePlantAttributes = function(response, displayAttributes) {
    var plants = [];
    for (var i = 0; i < response.data.data.plants.length; i++) {
      var plant = [];
      var attributes = Object.keys(response.data.data.plants[i]);
      for (var j = 0; j < attributes.length; j++) {
        var val = attributes[j];
        //attributeReplace is for grabbing dual words such as scientific_name
        var attributeAfterSpecialReplace = attributes[j].replace(/[^a-zA-Z ]/g, " ");
        if (attributeAfterSpecialReplace == 'accession number') {
          attributeAfterSpecialReplace = 'Accession #';
        }
        if (attributeAfterSpecialReplace == 'grex hybrid') {
          attributeAfterSpecialReplace = 'grex/hybrid';
        }
        if (attributeAfterSpecialReplace == 'variety name') {
          attributeAfterSpecialReplace = 'variety/grex';
        }
        if (attributeAfterSpecialReplace == 'grex status') {
          attributeAfterSpecialReplace = 'grex/hybrid';
        }
        if (attributes[j] == 'variety') {
          attributes[j] = 'variety/grex';
        }
        var attribute = {
          'key': attributeAfterSpecialReplace,
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
