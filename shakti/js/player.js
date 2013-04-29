define([], function () {
    'use strict';

    return {
	track: 'null',
	audio: new Audio(),
	mimetype: 'audio/ogg',
	status: null,

	PAUSED: 'PAUSED',
	PLAYING: 'PLAYING',
	STOPPED: 'STOPPED',

	setTrack: function (track) {
	    this.track = track;
	    this._loadTrack();
	},

	play: function () {
	    if (this.track) {
		this.audio.play();
		this.status = this.PLAYING;
	    }
	},

	pause: function () {
	    if (this.track) {
		this.audio.pause();
		this.status = this.PAUSED;
	    }
	},

	stop: function () {
	    if (this.track) {
		this.audio.pause();
		this._loadTrack(); // Change to seek 0...
		this.status = this.STOPPED;
	    }
	},

	togglePlay: function () {
	    if (this.track) {
		this.isPlaying() ? this.pause() : this.play();
	    }
	},

	isPlaying: function () {
	    return this.status === this.PLAYING;
	},

	_loadTrack: function () {
            this.audio.src = this.track.files[this.mimetype];
            this.audio.load();
	}
    };
});
