var app = angular.module('orchid', [
    'ngRoute',
    'ui.bootstrap'
]);

app.run(function($rootScope){
  if(bowser.ios){
    $rootScope.ios = true;
  } else {
    $rootScope.ios = false;
  }
})
