define([
    'angular',
    'controllers',
    'filters',
    'player'
], function (angular, controllers, filters, Player) {
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

    app.factory('Player', function() {
	return new Player();
    });

    app.filter('formatTime', filters.formatTime);

    angular.bootstrap(document, ['shakti']);

    return app;
});
