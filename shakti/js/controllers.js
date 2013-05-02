define([], function () {
    'use strict';

    return {
	ArtistCtrl: function ($scope, $http, Player) {

	    $http.get('/api/artists').success(function(data) {
	    	$scope.artists = data;
	    });

	    $scope.loadTracks = function (artist) {
	    	$http.get('/api/artist/' + artist.slug + '?fulltree=true').success(function (data) {
	    	    artist.albums = data.albums;
	    	});
	    };

	    $scope.addTrack = function (track) {
		Player.appendTrack(track, false);
	    };
	},

	PlayerCtrl: function ($scope, Player) {
	    function bindPlayer() { $scope.player = Player; }

	    bindPlayer();
	    Player.audio.addEventListener('timeupdate', function () {
		$scope.$apply(bindPlayer);
	    }.bind(this), false);

	    $scope.toggleText = function () {
		return Player.isPlaying() ? 'Pause' : 'Play';
	    };
	}
    }
});
