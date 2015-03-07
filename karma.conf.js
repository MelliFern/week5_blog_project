// Karma configuration
// Generated on Wed Mar 04 2015 13:22:18 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/karma_tests/karma_test_bundle.js'
    ],
    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
