var orchidApp = angular.module('orchidApp', ['ui.router']);

orchidApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
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
        })
        .state('view-collections', {
            url: '/collections',
            templateUrl: './views/refactored/viewcollections.html'
        })
        .state('notFound', {
            url: '*path',
            templateUrl: './views/refactored/404.html'
        });
});