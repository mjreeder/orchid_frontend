var app = angular.module('orchid', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ab-base64',
    'tableSort'
]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('', {
    templateUrl : '',
    controller  : '',
  })
  .otherwise({redirectTo:'/'});
})
