"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.succeedTaskInTest = succeedTaskInTest;
exports.errorTaskInTest = errorTaskInTest;
exports.simulateTask = simulateTask;
exports.succeedTaskWithValues = succeedTaskWithValues;
exports.drainTasksForTesting = drainTasksForTesting;

var _core = require("./core");

var _global = require("./global");

/**
 * Get the resulting value of a task, providing the given value as the inbound result.
 * If your task uses `.chain` or `Task.all`, you probably want to use `simulateTask`
 * or `succeedTaskWithValues` instead.
 */
function succeedTaskInTest(someTask, value) {
  return _runAndCaptureResult(someTask, function (_, s, _e) {
    return s(value);
  });
}
/**
 * Get the failure value of a task, providing the given value as the inbound error.
 *
 * If your task uses `.chain` or `Task.all`, you probably want to use `simulateTask`
 * instead.
 */


function errorTaskInTest(someTask, value) {
  return _runAndCaptureResult(someTask, function (_, _s, e) {
    return e(value);
  });
}
/**
 * Run a task, using `simulator` for bi-application. `simulator` recieves:
 *
 * 1. an object representing a side-effect with `payload` and `type`.
 * 2. a success handler to call with a mocked response.
 * 3. an error handler to call with a mocked out response.
 *
 * A simulator might be called more than once in the case of `Task.all`
 * or `task.chain`.
 */


function simulateTask(someTask, simulator) {
  return _runAndCaptureResult(someTask, simulator);
}
/**
 * Given some task, and array of values,
 */


function succeedTaskWithValues(someTask, values) {
  var index = 0;
  return _runAndCaptureResult(someTask, function (_, s) {
    if (index >= values.length) {
      throw new Error('Not enough values were provided!');
    }

    var returned = s(values[index]);
    index += 1;
    return returned;
  });
}
/**
 * This function should only be used in test environments to make assertions about
 * tasks as part of the test. Application code should not be mucking around with
 * the list of tasks.
 *
 * If you want to display information about tasks in your component,
 * add that information to your state tree when you create the task.
 *
 * If you want to get access to the current tasks, do so by returning the
 * tasks from helpers, and inspecting them before passing them to `withTask`.
 */


function drainTasksForTesting() {
  var drained = (0, _global.getGlobalTaskQueue)();
  (0, _global.updateGlobalTaskQueue)([]);
  (0, _global.clearLastWithTaskCall)();
  return drained;
}

function _runAndCaptureResult(someTask, simulator) {
  var returned;

  var setReturned = function setReturned(val) {
    returned = val;
  };

  (0, _core._run)(someTask, simulator, setReturned, setReturned);

  if (typeof returned === 'undefined') {
    throw new Error('A success or error handler was never called!');
  }

  return returned;
}