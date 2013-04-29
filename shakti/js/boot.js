require.config({
    paths: { 'angular': 'lib/angular-1.1.1' },
    shim: { 'angular': { 'exports' : 'angular' } },
    priority: ['angular']
});

require(['app']);
