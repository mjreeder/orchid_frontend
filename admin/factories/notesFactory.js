app.factory('NotesFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/notes';

    data.getAllNotes = function() {
        $http.get(baseUrl);
    };

    data.getNoteById = function(plant_id) {
        $http.get(baseUrl + "/plant_id/" + plant_id);
    };

    data.createNote = function (note) {
      $http({
          method: "POST",
          url: baseUrl + '/create',
          data: {
              "plant_id": note.plantId,
              "note": note.text,
              "timestamp": note.timestamp,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    };

    data.editNote = function(note){
      $http({
          method: "PUT",
          url: baseUrl + '/update',
          data: {
              "plant_id": note.plantId,
              "note": note.text,
              "timestamp": note.timestamp,
              "id": note.id,
              "session_id": $rootScope.userSessionId,
              "session_key": $rootScope.userSessionKey
          }
      });
    };

    return data;
});
