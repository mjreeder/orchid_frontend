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
            url: '/view_collections',
            templateUrl: './views/refactored/viewcollections.html'
        })
        .state('special-collections', {
            url: '/collections/:collection',
            templateUrl: './views/refactored/collections.html'
        })
        .state('alphabetical', {
            url: '/alphabet/:letter',
            templateUrl: './views/refactored/alphabetical.html',
            controller: 'alphabetController'
        })
        .state('countries', {
            url: '/country',
            templateUrl: './views/refactored/place-of-origin.html'
        })
        .state('blooming', {
            url: '/blooming',
            templateUrl: './views/refactored/blooming.html'
        })
        .state('subtribe', {
            url: '/sub_tribe',
            templateUrl: './views/refactored/subtribes.html'
        })
        .state('404', {
            url: '*path',
            templateUrl: './views/refactored/404.html'
        })
});