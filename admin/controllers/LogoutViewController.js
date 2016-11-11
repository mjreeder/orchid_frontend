app.controller('LogoutViewController', function($http, $location, sessionService) {
    sessionService.removeSession();
    console.log("AAA");
    $location.path("/login");
});
