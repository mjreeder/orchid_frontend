app.controller('LogoutViewController', function($http, $route, $location, sessionService, $window, $rootScope) {
    sessionService.removeSession();
    $window.alert("Logged Out. Goodbye");
    $location.path("/login");
    $rootScope.AuthUser = false;

    $route.reload();
});
