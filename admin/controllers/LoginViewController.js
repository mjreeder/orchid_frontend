app.controller('LoginViewController', function($scope, $rootScope, $location, SessionFactory, CONFIG){
  $scope.login = function (credentials) {
    // console.log(credentials);

    SessionFactory.login(credentials).then(function (response) {
      $rootScope.userSession = response.data.data.session_key;
      $location.path($rootScope.redirect);
    });

  }
});
