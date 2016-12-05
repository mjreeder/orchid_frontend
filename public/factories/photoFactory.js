//var orchidApp = angular.module('orchidApp');

orchidApp.factory('PhotoFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/orchid_site/public/api/photos';

    data.getPhotosByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    };

    data.getSimilarPhotos = function(name){
        return $http.get(baseUrl + "/getSimilarPlants/" + name);
    };

    return data;
});
