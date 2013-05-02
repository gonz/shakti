define([], function () {
    'use strict';

    function mod(x, y) {
	return ((x % y) + y) % y;
    }

    return mod;
});
