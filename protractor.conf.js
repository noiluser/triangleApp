//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'protractor.scenarios.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'https://triangle-appl.herokuapp.com/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
