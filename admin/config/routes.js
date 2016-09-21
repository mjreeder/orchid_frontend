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
            controller: 'TableViewController',
            templateUrl: 'views/Ipad-map.html'
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
            redirectTo: 'views/404.html'
        });
});
