orchid.factory('ClassificationLinkFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/classification_Link';

    data.createClassificationLink = function(classificationLink) {
      $http({
          method: "POST",
          url: baseUrl,
          data: {
              "plantId": classificationLink.plantId,
              "classId": classification.classId
          }
      });
    }

    data.getPlantByClassificationId = function(id){
      $http.get(baseUrl + '/plant/' + id);
    }

    return data;
});
