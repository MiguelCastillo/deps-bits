var pullDeps = require('pulling-deps');

/**
 * Method to process dependencies.
 *
 * @param {{source: source}} data - Object with `source` property to be
 *  processed for dependencies
 */
function dependencies(data, options) {
  return run(data, options);
}


/**
 * Method to configure a dependencies processor.
 *
 * @param {object} options - Configuration settings for processing dependencies
 *  This module uses [acorn]{@link http://marijnhaverbeke.nl/acorn/}, which is
 *  what the options are actually passed to.
 *
 * @returns {function} Delegate to be called with an object with a `source`
 *  property to pull the dependencies from.
 */
dependencies.config = function(options) {
  return function dependencies(data) {
    return run(data, options);
  };
};


function run(data, options) {
  options = options || {};
  if (!ignoreModule(data, options.ignore)) {
    return loadDependencies(data, pullDeps(data.source, options).dependencies);
  }
}

function loadDependencies(data, deps) {
  if (deps.length) {
    return {
      deps: data.deps.concat(deps)
    };
  }
}

function ignoreModule(data, ignoreList) {
  return ignoreList && ignoreList.length && ignoreList.indexOf(data.name) !== -1;
}

module.exports = dependencies;
