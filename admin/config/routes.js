app.config(function($routeProvider, CONFIG) {
    $routeProvider.
        when('/', {
            controller: 'HomePageController',
            templateUrl: CONFIG.homeTemplate,
            resolve:{
                authData: isAuthenticated
            }
        }).
        when('/login', {
            controller: 'LoginViewController',
            templateUrl: 'views/login.html'
        }).
        when('/house', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html',
            resolve:{
              authData: isAuthenticated
            }
        }).
        when('/house/display', {
            controller: 'DisplayViewController',
            templateUrl: 'views/Ipad-map.html',
            resolve:{
              authData: isAuthenticated
            }
        }).
        when('/house/warm', {
            controller: 'DisplayViewController',
            templateUrl: 'views/warmhouse.html',
            resolve:{
              authData: isAuthenticated
            }
        }).
        when('/house/cool', {
            controller: 'DisplayViewController',
            templateUrl: 'views/coolhouse.html',
            resolve:{
              authData: isAuthenticated
            }
        }).
        when('/search', {
            controller: 'SearchViewController',
            templateUrl: 'views/orchid-database.html',

        }).
        when('/plant',{
            controller: 'PlantViewController',
            templateUrl: 'views/more-info.html',

        }).
        when('/plant/:accession_number',{
            controller: 'PlantViewController',
            templateUrl: 'views/more-info.html',

        }).
        when('/popup',{
            controller: 'PopUpViewController',
            templateUrl: 'views/pop-up.html',

        }).
        when('/table',{
           controller: 'TableViewController',
            templateUrl: 'views/table.html',

        }).
        when('/table/:table_name',{
            controller: 'TableViewController',
            templateUrl: 'views/table.html',

        }).
        when('/plant/create',{
            controller: 'PlantViewController',
            templateUrl: 'views/more-info.html',
            
        }).
        when('/users/register',{
            controller: 'RegisterViewController',
            templateUrl: 'views/register.html',
        }).
        otherwise({
            controller: '404ViewController',
            templateUrl: 'views/404.html '
        });
});

var isAuthenticated = function ($q, $rootScope, $location) {
  if ($rootScope.userSession) {
        return true;
    } else {
        $rootScope.redirect = $location.path();
        $location.path("/login");
    }
};
