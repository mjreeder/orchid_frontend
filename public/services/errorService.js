/**
 * An Error handling helper service
 * @namespace $error
 * @author Brandon Groff
 */
orchidApp.service('$error', function(config, $toast, $state){
  
  
  /**
   * a helper function for univesally handling errors in a nice way
   * @author Brandon Groff
   * @param {object} error  a Javascript Error object
   * @param {boolean} notify = false a boolean to notify the user
   * @param {boolean} redirect = false a boolean to redirect the page to 404 page
   */
  this.handle = function(error, notify = false, redirect = false) {
    if (config.dev) {
      console.log(error);
      console.trace();
    };
    
    if (notify) {
      $toast.showErrorMessage(error.message);
    }
    
    if (redirect){
      $state.go('404');
    }
    
  };
  
  
});