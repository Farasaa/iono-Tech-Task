"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskCreator = taskCreator;

var _core = require("./core");

/**
 * # Legacy APIs
 *
 * These are provided as a stop-gap to avoid breaking changes.
 * They are currently re-exported by default, but that will
 * probaby change in the future.
 */

/**
 * ## `taskCreator`
 *
 * Given a function: `(arg, successCb, errorCb) => any`
 * Returns a task creator function: `(arg) => Task`.
 *
 * This API is a bit cumbersome.
 * You probably want to use `Task.fromCallback` or `Task.fromPromise` instead,
 * which do the same thing but with less boilerplate.
 */
function taskCreator(fn, label) {
  var creator = function creator(outbound) {
    return (0, _core.taskCreator_)(function (success, error) {
      return fn(outbound, success, error);
    }, outbound, label);
  };

  creator.type = label;
  return creator;
}