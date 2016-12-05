app.constant('CONFIG', {
   api: 'orchid_site/public/api',
        homeTemplate: 'views/Ipad-map.html',
        messageTimeout: 5000,
        maxFileSizeBits: 50 * 1000000
});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
