# deps-bits
Process amd and cjs dependencies in [bit runner](https://github.com/MiguelCastillo/bit-runner).

> Side note: this module is also used by [bit imports](https://github.com/MiguelCastillo/bit-imports) to process dependencies in the browser. And that possible because both tools use [bit loader](https://github.com/MiguelCastillo/bit-loader) to do the heavy lifting.


### Configuration `bitrunnerfile.js`

#### Process dependencies

``` javascript
var bitRunner = require('bit-runner');
var deps      = require('deps-bits');

/**
 * JavaScript pipeline
 */
bitRunner.register('default', function buildPipeline(task) {
  task
    .load('index.js')
    .then(deps)
});
```

#### Configure the `deps-bits` plugin

This module uses [acorn](http://marijnhaverbeke.nl/acorn/) internally, and the configuration settings provided here are forwarded right to it. So, please refer to [acorn's docs](http://marijnhaverbeke.nl/acorn/) for details on the available settings.

``` javascript
var bitRunner = require('bit-runner');
var deps      = require('deps-bits');

/**
 * JavaScript pipeline
 */
bitRunner.register('default', function buildPipeline(task) {
  task
    .load('index.js')
    .then(deps.config({ecmaVersion: 6}))
});
```
