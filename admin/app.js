var app = angular.module('orchid', [
    'ngRoute',
    'ui.bootstrap',
    'autocomplete'
]);

app.run(function($rootScope){
  if(bowser.ios){
    $rootScope.ios = true;
  } else {
    $rootScope.ios = false;
  }
})

//http://stackoverflow.com/questions/30049222/iphone-keyboard-not-hiding-when-tapping-the-screen
//$(document).ready(function () {
//  $('body').click(function () {
//    document.activeElement.blur();
//    console.log("blur");
//  });
//
//  $('input').click(function (event) {
//    event.stopPropagation();
//  });
//});
