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
        when('/house', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html'
        }).
        when('/house/display', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html'
        }).
        when('/house/warm', {
            controller: 'WarmHouseViewController',
            templateUrl: 'views/warmhouse.html'
        }).
        when('/house/cool', {
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
        when('/plant/:accession_number',{
            controller: 'PlantViewController',
            templateUrl: 'views/more-info.html'
        }).
        when('/popup',{
            controller: 'PopUpViewController',
            templateUrl: 'views/pop-up.html'
        }).
        when('/table',{
           controller: 'TableViewController',
            templateUrl: 'views/table.html'
        }).
        when('/table/:table_name',{
            controller: 'TableViewController',
            templateUrl: 'views/table.html'
        }).
        otherwise({
            controller: '404ViewController',
            templateUrl: 'views/404.html '
        });
});
