/**
 * An toast/notification helper service
 * @namespace $toast
 * @author Brandon Groff
 */
orchidApp.service('$toast', function (Notification) {

  /**
   * show standard a notification
   * @author Brandon Groff
   * @param {string} message the message to display
   */
  this.showMessage = function(message) {
    Notification(message);
  };
  
  /**
   * show standard an Error notification
   * @author Brandon Groff
   * @param {string} message the message to display
   */
  this.showErrorMessage = function (message) {
    Notification.error(message);
  };

});