require.config({
    basePath: '../src',
    shim: {
        'angular': {
            exports: 'angular'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'angular-sanitize': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] }
    }
});