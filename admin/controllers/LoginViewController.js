app.controller('LoginViewController', function($scope, $rootScope, $location, SessionFactory, sessionService, CONFIG){
  $scope.login = function (credentials) {
    // console.log(credentials);

    SessionFactory.login(credentials).then(function (response) {
      sessionService.createStoredSession(response.data.data.session_key, response.data.data.session_id)
      $location.path($rootScope.redirect);
    });

  }
});
