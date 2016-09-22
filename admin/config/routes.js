app.config(function($routeProvider, CONFIG) {
    $routeProvider.
        when('/', {
            controller: 'HomePageController',
            templateUrl: CONFIG.homeTemplate
        }).
        when('/login', {
            controller: 'LoginViewController',
            templateUrl: 'views/login.html'
        }).
        when('/table', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html'
        }).
        when('/table/display', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html'
        }).
        when('/table/warm', {
            controller: 'WarmHouseViewController',
            templateUrl: 'views/warmhouse.html'
        }).
        when('/table/cool', {
            controller: 'CoolHouseViewController',
            templateUrl: 'views/coolhouse.html'
        }).
        when('/search', {
            controller: 'SearchViewController',
            templateUrl: 'views/orchid-database.html'
        }).
        when('/plant',{
            controller: 'PlantViewController',
            templateUrl: 'views/more-info.html'
        }).
        otherwise({
            controller: '404ViewController',
            templateUrl: 'views/404.html '
        });
});
