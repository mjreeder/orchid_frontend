app.controller('LoginViewController', function($scope, $rootScope, $location, SessionFactory, sessionService, CONFIG){
  $scope.login = function (credentials) {
    console.log(credentials);

    SessionFactory.login(credentials).then(function (response) {
      sessionService.createStoredSession(response.data.data.session_key, response.data.data.session_id);
      if($rootScope.redirect){
        $location.path($rootScope.redirect);
      }
      else{
        $location.path('/');
      }
    });

  }
});
