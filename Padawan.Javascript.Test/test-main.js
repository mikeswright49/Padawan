var allTestFiles = [];
var allPaths = {};
var Require_REGEXP = /(lib|node_modules|test-main)/i;
var TEST_REGEXP = /(spec)/i;
var path = "scripts/src";

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
    }


    if (!Require_REGEXP.test(file)) {
      var requirePath = file.substring(file.indexOf(path) + path.length + 1)
      requirePath = requirePath.substring(0, requirePath.length - 3);

      allPaths[requirePath] = [file.substring(0, file.length - 3)];
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  basePath: '',

  // dynamically load all test files
  deps: allTestFiles,
  paths: allPaths,
  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
