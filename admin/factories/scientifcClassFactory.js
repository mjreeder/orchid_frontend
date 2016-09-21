app.factory('ScientificClassFactory', function($http) {

    var data = {};
    var baseUrl = 'http://localhost:8888/orchid_site/public/api/scientific_class';

    data.getAllClasses = function(user) {
        $http.get(baseUrl);
    }

    data.getClassById = function (id) {
      $http.get(baseUrl + '/' + id);
    }

    data.createClass = function (scientifClass) {
      $http({
          method: "POST",
          url: baseUrl,
          data: {
              "classificationId": scientifClass.classificationId,
              "name": scientifClass.name
          }
      });
    }

    data.editClass = function (scientifClass) {
      $http({
          method: "PUT",
          url: baseUrl,
          data: {
              "classificationId": scientifClass.classificationId,
              "name": scientifClass.name,
              "id": scientifClass.id
          }
      });
    }

    return data;
});
