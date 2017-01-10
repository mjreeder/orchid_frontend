orchidApp.factory('EmailFactory', function($http, $rootScope) {

    var data = {};
    var baseUrl = location.origin +'2016/orchid_site/public/api/email';

    data.createNote = function (note) {
        $http({
            method: "POST",
            url: baseUrl + '/create',
            data: {
                "from_email": note.from_email,
                "comment": note.comment,
                "from_name": note.from_name,
                "to": 'cleblanc@bsu.edu',
                "subject": note.subject
            }
        });
    };

    return data;
});
