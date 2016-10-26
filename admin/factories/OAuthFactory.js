app.factory('OAuthFactory', function( $rootScope, CONFIG, $http, $location, $window){


    var factory  = {};

    factory.authorize = function(){

        $window.location.href = "https://account.box.com/api/oauth2/authorize?response_type=code&client_id=xvgdpsrq8aof6f2eijnuclflm93alu8l&redirect_uri=http://localhost:8888/orchid_site/public/api/users/auth&state=security_code";

       //return $http({
       //     method: "POST",
       //     url: 'https://account.box.com/api/oauth2/authorize',
       //     data: {
       //         "response_type": "code",
       //         "client_id": "xvgdpsrq8aof6f2eijnuclflm93alu8l",
       //         "redirect_uri": "http://localhost:8888",
       //         "state": "security_token"
       //     }
       // });
    };

    factory.response = function(){

    };







    return factory;


});
