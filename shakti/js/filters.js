define([], function () {
    'use strict';

    function zeroFill(value, count) {
	var valueLength, fill;

	valueLength = value.toString().length
	fill = (new Array(count + 1 - valueLength)).join('0');

	return fill + value;
    };

    function formatTimeFilter () {
	return function(input) {
	    var mins, secs;

	    input = input || 0;
	    mins = parseInt(input / 60, 10),
	    secs = input % 60;

	    return zeroFill(mins, 2) + ':' + zeroFill(secs, 2);
	};
    };

    return {
	formatTime: formatTimeFilter
    };
});
