var orchidApp = angular.module('orchidApp', ['ui.router']);

orchidApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: './views/refactored/menu.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: './views/refactored/about.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: './views/refactored/contact.html',
            controller: 'contactController'
        })
        .state('view-collections', {
            url: '/menu',
            templateUrl: './views/refactored/menu.html'
        })
        .state('generalCollections', {
            url: '/collections',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specialCollectionsController'
        })
        .state('alphabetical', {
            url: '/alphabet',
            abstract: true,
            templateUrl: './views/refactored/alphabetical.html',
            controller: 'alphabetController'
        })
        .state('alphabetical.search', {
            url: '/:letter',
            controller: 'letterSearchController',
            parent: 'alphabetical',
            templateUrl: './views/refactored/alphabetGrid.html'
        })
        .state('blooming', {
            url: '/blooming',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'bloomingController'
        })
        .state('countries', {
            url: '/country',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'countriesController'
        })
        .state('specificCountry', {
            url: '/country/:country',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificCountryController'
        })
        .state('subtribe', {
            url: '/sub_tribe',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'subtribeController'
        })
        .state('specificSubTribe', {
            url: '/sub_tribe/:tribe',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificSubTribeController'
        })
        .state('specificPlant', {
            url: '/plant/:accession_number',
            templateUrl: './views/refactored/plant.html',
            controller: 'plantController'
        })
        .state('specificCollection', {
            url: '/collections/:collection',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificSpecialCollectionsController'
        })
        .state('404', {
            url: '*path',
            templateUrl: './views/refactored/404.html'
        })
});
