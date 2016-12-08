app.controller('LoginViewController', function($scope, $rootScope, $location, SessionFactory, sessionService, CONFIG){
  $scope.login = function (credentials) {
    SessionFactory.login(credentials).then(function (response) {
      sessionService.createStoredSession(response.data.data.session_key, response.data.data.session_id);
      if($rootScope.redirect){
        //$location.path($rootScope.redirect);
        $location.path('/house/display')
      }
      else{
        $location.path('/');
      }
    }).catch(function(e){
      alert("Login Failed");
    });

  }
});
