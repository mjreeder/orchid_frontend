app.controller('LogoutViewController', function($http, $location) {

    console.log("AAA");
    $location.path("/login");
});
