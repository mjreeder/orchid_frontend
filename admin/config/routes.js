app.config(function ($routeProvider, CONFIG) {
    $routeProvider.
    when('/', {
        controller: 'HomePageController',
        templateUrl: CONFIG.homeTemplate,
        resolve: {
          'data':isAuthenticated
        }
    }).
    when('/login', {
        controller: 'LoginViewController',
        templateUrl: 'views/login.html'
    }).
    when('/logout', {
            controller: 'LogoutViewController',
            templateUrl: 'views/login.html'
        }).
    when('/house', {
        controller: 'DisplayViewController',
        templateUrl: 'views/Ipad-map.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/house/display', {
        controller: 'DisplayViewController',
        templateUrl: 'views/Ipad-map.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/house/warm', {
        controller: 'DisplayViewController',
        templateUrl: 'views/warmhouse.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/house/cool', {
        controller: 'DisplayViewController',
        templateUrl: 'views/coolhouse.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/search', {
        controller: 'SearchViewController',
        templateUrl: 'views/orchid-database.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/plant', {
        controller: 'PlantViewController',
        templateUrl: 'views/more-info.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/plant/:accession_number', {
        controller: 'PlantViewController',
        templateUrl: 'views/more-info.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/popup', {
        controller: 'PopUpViewController',
        templateUrl: 'views/pop-up.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/moveTable', {
        controller: 'PopUpViewController',
        templateUrl: 'views/MoveTable.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/table', {
        controller: 'TableViewController',
        templateUrl: 'views/table.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/table/:table_name', {
        controller: 'TableViewController',
        templateUrl: 'views/table.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/plant/create', {
        controller: 'PlantViewController',
        templateUrl: 'views/more-info.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    when('/users/register', {
        controller: 'RegisterViewController',
        templateUrl: 'views/register.html',
        resolve: {
            'data': isSuperAuthenticated
        }
    }).
    when('/users/change-password', {
        controller: '404ViewController',
        templateUrl: 'views/change-password.html',
        resolve: {
            'data': isAuthenticated
        }
    }).
    otherwise({
        controller: '404ViewController',
        templateUrl: 'views/404.html '
    });
});

var isAuthenticated = function ($rootScope, $location, sessionService, UserFactory) {
    var session = sessionService.hasRecentSession();
    if (session) {
        $rootScope.isLoggedIn = true;

        UserFactory.getAuth().then(function (response){
            var data = response.data.data;
            if (data.authLevel == 1){
                $rootScope.AuthUser = true;
            } else {
                $rootScope.AuthUser = false;
            }
        });
        return true;
    } else {
        $rootScope.redirect = $location.path();
        $location.path("/login");
    }
};

var isSuperAuthenticated = function ($rootScope, $location, sessionService, UserFactory) {
    var session = sessionService.hasRecentSession();
    var superAdmin = true;
    if (session) {
        $rootScope.isLoggedIn = true;
        console.log("HEEEE");
        UserFactory.getAuth().then(function (response){
            var data = response.data.data;

            if (data.authLevel == 1){
                $rootScope.AuthUser = true;
            } else {
                $rootScope.redirect = $location.path();
                $location.path("/");
                $rootScope.AuthUser = false;
            }
        });
    } else {
        $rootScope.redirect = $location.path();
        $location.path("/login");
        return false;
    }


};
