//var orchidApp = angular.module('orchidApp');

orchidApp.factory('PhotoFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'/2016/orchid_site/public/api/photos';

    data.getPhotosByPlantID = function(plant_id) {
        return $http.get(baseUrl + "/plant_id/" + plant_id);
    };

    data.getSimilarPhotos = function(name){
        return $http.get(baseUrl + "/getSimilarPlants/" + name);
    };

    data.oneCountryPhoto = function(country_id){
        return $http.get(baseUrl + "/onePhotoCountry/" + country_id);
    };

    data.onePhotoCollections = function(sp){
        return $http.get(baseUrl + "/onePhotoCollections/" + sp);
    };

    data.onePhotoTribe = function(tribe){
        return $http.get(baseUrl + "/onePhotoTribe/" + tribe);
    };
    return data;
});
