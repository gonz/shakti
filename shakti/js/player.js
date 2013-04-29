define([], function () {
    'use strict';

    function Player() {
	this.track = null;
	this.audio = new Audio();
	this.mimetype = 'audio/ogg';
	this.status = null;
    }

    Player.PAUSED = 'PAUSED';
    Player.PLAYING = 'PLAYING';
    Player.STOPPED = 'STOPPED';

    Player.prototype.setTrack = function (track) {
	this.track = track;
	this._loadTrack();
    };

    Player.prototype.play = function () {
	if (this.track) {
	    this.audio.play();
	    this.status = Player.PLAYING;
	}
    };

    Player.prototype.pause = function () {
	if (this.track) {
	    this.audio.pause();
	    this.status = Player.PAUSED;
	}
    };

    Player.prototype.stop = function () {
	if (this.track) {
	    this.audio.pause();
	    this._loadTrack(); // Change to seek 0...
	    this.status = Player.STOPPED;
	}
    };

    Player.prototype.togglePlay = function () {
	if (this.track) {
	    this.isPlaying() ? this.pause() : this.play();
	}
    };

    Player.prototype.isPlaying = function () {
	return this.status === Player.PLAYING;
    };

    Player.prototype._loadTrack = function () {
        this.audio.src = this.track.files[this.mimetype];
        this.audio.load();
    };

    return Player
});
