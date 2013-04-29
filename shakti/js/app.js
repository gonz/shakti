define(['angular', 'controllers'], function (angular, controllers) {
    'use strict';

    var app = angular.module('shakti', []);

    app.controller('PlayerCtrl', controllers.PlayerCtrl);

    app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	    .when('/artists', {
		templateUrl: 'partials/artists.html',
		controller: controllers.ArtistCtrl

	    })
	    .otherwise({ redirectTo: '/artists' });
    }]);

    angular.bootstrap(document, ['shakti']);

    return app;
});
