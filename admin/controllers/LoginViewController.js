app.controller('LoginViewController', function($scope, $rootScope, $location, SessionFactory, sessionService, CONFIG, OAuthFactory){


  //$scope.login = function (credentials) {
  //  // console.log(credentials);
  //
  //  SessionFactory.login(credentials).then(function (response) {
  //    sessionService.createStoredSession(response.data.data.session_key, response.data.data.session_id);
  //    if($rootScope.redirect){
  //      $location.path($rootScope.redirect);
  //    }
  //    else{
  //      $location.path('/');
  //    }
  //  });
  //
  //}

  OAuthFactory.authorize().then(function (response){
    console.log(response);

  },function(error){

    console.log(error);
  });


});
