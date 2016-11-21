app.service('$BoxAuth', function ($rootScope, CONFIG, $http) {

    var info = {};

    var prom = {};

    /**
     *
     * @func
     *
     * @returns Bool
     **/
    this.isLoggedIn = function () {
        var boxInfo = localStorage.getItem('Box');
        if (boxInfo) {
            boxInfo = JSON.parse(boxInfo);
            if (boxInfo.access_token) {
                return true;
            }
        }
        return false;
    };

    /**
     *
     * @func
     *
     * @returns nothing
     **/
    this.setInfo = function (data) {
        info = data;
        var parsed = JSON.stringify(data);
        localStorage.setItem('Box', parsed);
    };

    /**
     *
     * @func
     *
     * @returns nothing
     **/
    this.getInfo = function () {
        if (info) {
            return info;
        }

        var boxInfo = localStorage.getItem('Box');
        if (boxInfo) {
            boxInfo = JSON.parse(boxInfo);
            info = boxInfo;
            return boxInfo;
        } else {
            //run through login
        }
    };


    this.renewToken = function () {
        this.getInfo();
        if (!info.refresh_token) {
            //we need to login from scratch!
        }


        var prom  = new Promise.all(resolve).then(function(values){
            $http({
                method: 'POST',
                url: 'https://api.box.com/oauth2/token?grant_type=refresh_token&refresh_token=' + info.refresh_token + '&client_id=' + [CLIENT_ID] + '&client_secret=' + [CLIENT_SECRET],
                header: {},
                data: {}
            }).then(function (data) {
                this.setInfo(data);
                resolve(info);
            }, function (error) {
                //handle error
                //maybe redo login?
                reject(error);
            });
        });


    return prom;
    };

});