define(['playlist'], function (Playlist) {
    'use strict';

    function Player() {
	this.audio = new Audio();
	this.mimetype = 'audio/ogg';
	this.status = 'STOPPED';
	this.playlist = new Playlist();
    }

    Player.PAUSED = 'PAUSED';
    Player.PLAYING = 'PLAYING';
    Player.STOPPED = 'STOPPED';

    Player.prototype._loadTrackAudio = function (track) {
	this.audio.pause();
        this.audio.src = track.files[this.mimetype];
        this.audio.load();
	this.status = Player.STOPPED;
    };

    Player.prototype.currentTrack = function (track) {
	return this.playlist.currentTrack();
    };

    Player.prototype.appendTrack = function (track) {
	this.playlist.append(track);
    };

    Player.prototype.playPlaylistIndex = function (index) {
	this.playlist.setCurrentTrack(index);
	this.play();
    }

    Player.prototype.play = function () {
	var currentTrack, skip_load;

	currentTrack = this.currentTrack();
	skip_load = this.status === Player.PAUSED;

	if (currentTrack) {
	    if (!skip_load) {
		this._loadTrackAudio(currentTrack);
	    }
	    this.audio.play();
	    this.status = Player.PLAYING;
	}
    };

    Player.prototype.pause = function () {
	if (this.currentTrack()) {
	    this.audio.pause();
	    this.status = Player.PAUSED;
	}
    };

    Player.prototype.stop = function () {
	if (this.currentTrack()) {
	    this._loadTrackAudio(this.currentTrack());
	}
    };

    Player.prototype._switchTrack = function (playlist_load_fn) {
	var nextTrack = this.playlist[playlist_load_fn]();

	if (!nextTrack) {
	    this.stop();
	} else if (this.status === Player.PLAYING) {
	    this.play();
	}
	return nextTrack;
    }

    Player.prototype.nextTrack = function () {
	this._switchTrack('loadNext');
    };

    Player.prototype.prevTrack = function () {
	this._switchTrack('loadPrevious');
    };

    Player.prototype.togglePlay = function () {
	if (this.currentTrack()) {
	    this.isPlaying() ? this.pause() : this.play();
	}
    };

    Player.prototype.isPlaying = function () {
	return this.status === Player.PLAYING;
    };

    return Player
});
