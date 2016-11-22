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
        })
        .state('view-collections', {
            url: '/collections',
            templateUrl: './views/refactored/viewcollections.html'
        })
        .state('special-collections', {
            url: '/special_collections',
            templateUrl: './views/refactored/special-collections.html'
        })
        .state('alphabetical', {
            url: '/alphabet',
            templateUrl: './views/refactored/alphabetical.html',
            controller: 'alphabetController'
        })
        .state('place-of-origin', {
            url: '/origin',
            templateUrl: './views/refactored/place-of-origin.html'
        })
        .state('404', {
            url: '*path',
            templateUrl: './views/refactored/404.html'
        })
});