define(['player'], function (player) {
    'use strict';

    return {
	ArtistCtrl: function ($scope, $http) {

	    $http.get('/api/artists').success(function(data) {
	    	$scope.artists = data;
	    });

	    $scope.loadTracks = function (artist) {
	    	$http.get('/api/artist/' + artist.slug + '?fulltree=true').success(function (data) {
	    	    artist.albums = data.albums;
	    	});
	    };

	    $scope.playTrack = function (track) {
	    	player.setTrack(track);
	    	player.play()
	    };
	},

	PlayerCtrl: function ($scope) {
	    $scope.player = player;

	    $scope.toggleText = function () {
		return player.isPlaying() ? 'Pause' : 'Play';
	    }
	}
    }
});
