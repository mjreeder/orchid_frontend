app.factory('classificationLinkFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/classification_link';

    data.createClassificationLink = function(classificationLink) {
      return $http({
          method: "POST",
          url: baseUrl,
          data: {
              "plantId": classificationLink.plantId,
              "classId": classification.classId
          }
      });
    }

    data.getPlantByClassificationId = function(id){
      return $http.get(baseUrl + '/plant/' + id);
    }

    data.getPlantHierarchy = function(id){
        return $http.get(baseUrl + '/plant_hierarchy/' + id);
    }

    return data;
});
