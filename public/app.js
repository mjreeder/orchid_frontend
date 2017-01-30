var orchidApp = angular.module('orchidApp', ['ui.router', 'ui-notification']);

orchidApp.constant('config', {
  dev: true
});

/* Fix Angular 1.6 error */
//orchidApp.config(['$qProvider', function ($qProvider) {
//    $qProvider.errorOnUnhandledRejections(false);
//}]);

/* Configure the ui-notifications */
orchidApp.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 4000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top',
        closeOnClick: true
    });
});

orchidApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: './views/refactored/menu.html',
            controller: 'HomePageController',
            data: {
              pageTitle: 'Home'
            }
        })
        .state('about', {
            url: '/about',
            templateUrl: './views/refactored/about.html',
            data: {
              pageTitle: 'About'
            }
        })
        .state('contact', {
            url: '/contact',
            templateUrl: './views/refactored/contact.html',
            controller: 'contactController',
            data: {
              pageTitle: 'Contacts'
            }
        })
        .state('view-collections', {
            url: '/menu',
            templateUrl: './views/refactored/menu.html',
            data: {
              pageTitle: 'View Collections'
            }
        })
        .state('generalCollections', {
            url: '/collections',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specialCollectionsController',
            data: {
              pageTitle: 'Special Collections'
            }
        })
        .state('alphabetical', {
            url: '/alphabet',
            abstract: true,
            templateUrl: './views/refactored/alphabetical.html',
            controller: 'alphabetController',
            data: {
              pageTitle: 'Alphabetical'
            }
        })
        .state('alphabetical.search', {
            url: '/:letter',
            controller: 'letterSearchController',
            parent: 'alphabetical',
            templateUrl: './views/refactored/alphabetGrid.html',
            data: {
              pageTitle: 'Alphabetical'
            }
        })
        .state('blooming', {
            url: '/blooming',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'bloomingController',
            data: {
              pageTitle: 'Current Blooming'
            }
        })
        .state('countries', {
            url: '/country',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'countriesController',
            data: {
              pageTitle: 'Countries'
            }
        })
        .state('specificCountry', {
            url: '/country/:country',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificCountryController',
            data: {
              pageTitle: 'Loading...'
            }
        })
        .state('subtribe', {
            url: '/sub_tribe',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'subtribeController',
            data: {
              pageTitle: 'Sub Tribes'
            }
        })
        .state('specificSubTribe', {
            url: '/sub_tribe/:tribe',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificSubTribeController',
            data: {
              pageTitle: 'Loading...'
            }
        })
        .state('specificPlant', {
            url: '/plant/:accession_number',
            templateUrl: './views/refactored/plant.html',
            controller: 'plantController',
            data: {
              pageTitle: 'Loading...'
            }
        })
        .state('specificCollection', {
            url: '/collections/:collection',
            templateUrl: './views/refactored/generalCategory.html',
            controller: 'specificSpecialCollectionsController',
            data: {
              pageTitle: 'Loading...'
            }
        })
        .state('404', {
            url: '*path',
            templateUrl: './views/refactored/404.html'
        })
});

orchidApp.run(function($rootScope, $state, $stateParams) {
  //Used to allow the view to access $state service
  $rootScope.$state = $state;
});
