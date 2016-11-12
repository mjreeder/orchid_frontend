var orchidApp = angular.module('orchidApp', ['ui.router']);

orchidApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './views/refactored/home.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: './views/refactored/about.html'
        })
        .state('contact', {
            url: '/about',
            templateUrl: './views/refactored/contact.html'
        });
});