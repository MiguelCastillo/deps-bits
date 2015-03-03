var pullDeps = require('pulling-deps');

/**
 * Method to process dependencies.
 *
 * @param {{source: source}} moduleMeta - Object with `source` property to be
 *  processed for dependencies
 */
function dependencies(moduleMeta) {
  _dependencies(moduleMeta, this.options);
}


/**
 * Method to configure a dependencies processor.
 *
 * @param {object} options - Configuration settings for processing dependencies
 *  This module uses [acorn]{@link http://marijnhaverbeke.nl/acorn/}, which is
 *  what the options are actually passed to.
 *
 * @returns {function} Delegate to be called with an object with a `source` property to pull the
 *  dependencies from.
 */
dependencies.config = function(options) {
  return function dependencies(moduleMeta) {
    _dependencies(moduleMeta, options);
  };
};


function _dependencies(moduleMeta, options) {
  options = options || {};
  if (!ignoreModule(moduleMeta, options.ignore)) {
    loadDependencies(moduleMeta, pullDeps(moduleMeta.source, options).dependencies);
  }
}

function loadDependencies(moduleMeta, deps) {
  if (deps.length) {
    moduleMeta.deps = moduleMeta.deps.concat(deps);
  }
}

function ignoreModule(moduleMeta, ignoreList) {
  return ignoreList && ignoreList.length && ignoreList.indexOf(moduleMeta.name) !== -1;
}

module.exports = dependencies;
