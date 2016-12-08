app.controller('LogoutViewController', function($http, $location, sessionService, $window) {
    sessionService.removeSession();
    $window.alert("Logged Out. Goodbye");
    $location.path("/login");
});
