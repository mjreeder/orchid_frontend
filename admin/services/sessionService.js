app.service('sessionService', function($rootScope, SessionFactory) {

    // store session credentials
    this.createStoredSession = function(sessionKey, session_id) {
        localStorage.setItem("session_key", sessionKey);
        localStorage.setItem("session_id", session_id);
        
        //add session credentials to rootScope for post/put/delete to check for authorization
        $rootScope.userSessionKey = session_key;
        $rootScope.userSessionId = session_id;
    }

    // check that there is a session key and session id are present
    this.hasRecentSession = function() {
        if(localStorage.getItem("session_key") !== null && localStorage.getItem("session_key") !== undefined &&
            localStorage.getItem("session_id") !== null && localStorage.getItem("session_id") !== undefined){
          return true;
        }
        else{
          return false;
        }
    }
});
