app.service('sessionService', function($rootScope, SessionFactory) {

    this.createSessionCookie = function(username, sessionKey) {
        localStorage.setItem("session_key", sessionKey);
    }

    this.hasRecentSession = function() {
        if(localStorage.getItem("session_key") !== null && localStorage.getItem("session_key") !== undefined){
          var sesssionKey = localStorage.getItem("session_key");
          $rootScope.userSession = sesssionKey;
          return true;
        }
        else{
          return false;
        }
    }
});
