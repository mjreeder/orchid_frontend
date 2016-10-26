app.factory('BoxFactory', function($http, $rootScope, $BoxAuth) {
    var data = {};


    var getAccessToken = function(){
        //first check if they are logged in

        //if they are, then return the token

        // if they are not, tell the service to go get the token

        //return the token;
    }


    data.postPicture = function (info) {
        var token = getAccessToken();
        return $http({
            method: "POST",
            url: 'https://upload.box.com/2.0/files/98484576163',
            header: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            data: {}

        })

    };
    return data;
});