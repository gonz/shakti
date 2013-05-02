define(['utils/mod'], function (mod) {
    'use strict';

    function Playlist(config) {
	this.tracks = [];
	this.current = null;
	this.currentIndex = 0;
	this.loop = true;
    };

    Playlist.prototype.setCurrentTrack = function (index) {
	var track = this.tracks[index];
	this.current = track;
	this.currentIndex = index;
	return track;
    };

    Playlist.prototype.currentTrack = function () {
	return this.current;
    };

    Playlist.prototype.append = function (track) {
	this.tracks.push(track);
	if (!this.current) {
	    this.setCurrentTrack(0);
	}
    };

    Playlist.prototype._loadOffset = function (offset) {
	var nextIndex, track, looped, isNextGreater;

	nextIndex = mod(this.currentIndex + offset, this.tracks.length);
	track = null;
	isNextGreater = this.currentIndex < nextIndex
	looped = (offset > 0) ? !isNextGreater : isNextGreater;

	if (!looped || this.loop) {
	    track = this.setCurrentTrack(nextIndex);
	}
	return track;
    };

    Playlist.prototype.loadNext = function () {
	return this._loadOffset(+1);
    };

    Playlist.prototype.loadPrevious = function () {
	return this._loadOffset(-1);
    };

    return Playlist;
});
