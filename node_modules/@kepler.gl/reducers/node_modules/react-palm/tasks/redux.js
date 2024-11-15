"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTasks = withTasks;
exports.disableStackCapturing = disableStackCapturing;
exports.withTask = exports.taskMiddleware = void 0;

var _core = require("./core");

var _global = require("./global");

var CACHED_PROMISE = Promise.resolve();

var makeDispatchAsync = function makeDispatchAsync(dispatch) {
  return function (action) {
    return CACHED_PROMISE.then(function () {
      return dispatch(action);
    });
  };
}; // The way webpack does hot-reloading seems to break the checks we
// do against the stack trace.


var WEBPACK_HOT_RELOAD_ENABLED = Boolean(module.hot);
var enableStackCapture = !WEBPACK_HOT_RELOAD_ENABLED;
var IMPROPER_TASK_USAGE = "Tasks should not be added outside of reducers.";
/**
 * You need to install this middleware for tasks to have their handlers run.
 *
 * You probably do not want to use this middleware within your test environment.
 * Instead, use `drainTasksForTesting` to retrieve and make assertions about them.
 *
 * This middleware changes the behavior of `store.dispatch` to return a promise.
 * That promise will resolve when all pending tasks for that call to `dispatch`
 * have finished (including calls transitively enqueued by tasks that dispatch actions).
 */

var taskMiddleware = function taskMiddleware(store) {
  return function (next) {
    return function (action) {
      // If we begin a call to dispatch with tasks still in the queue,
      // we have a problem.
      if (enableStackCapture && (0, _global.getGlobalTaskQueue)().length > 0) {
        var err = (0, _global.getLastWithTaskCall)();
        (0, _global.clearLastWithTaskCall)();
        throw err;
      }

      next(action);
      var dispatch = makeDispatchAsync(store.dispatch);

      if ((0, _global.getGlobalTaskQueue)().length > 0) {
        var taskResolutions = (0, _global.getGlobalTaskQueue)().map(runTaskActual(dispatch));
        (0, _global.updateGlobalTaskQueue)([]);
        (0, _global.clearLastWithTaskCall)();
        return Promise.all(taskResolutions);
      }

      return CACHED_PROMISE;
    };
  };
}; // Given a function that accepts two continuations (one for success, one for error),
// call the function supplying the provided continuations.


exports.taskMiddleware = taskMiddleware;

var biApply = function biApply(f, s, e, c) {
  return f(s, e, c);
}; // Run the task with the proper effect


function runTaskActual(dispatch) {
  return function (task) {
    // unsafe coerce this because it doesn't matter
    return (0, _core._run)(task, biApply, dispatch, dispatch, {
      onProgress: dispatch
    });
  };
}
/**
 * Use this function in your reducer to add tasks to an action handler.
 * The task will be lifted up to the top of your app. Returns the same
 * state object passed into it.
 */


function withTasks(state, tasks) {
  if (enableStackCapture && !(0, _global.getLastWithTaskCall)()) {
    (0, _global.setLastWithTaskCall)(trace(IMPROPER_TASK_USAGE));
  }

  (0, _global.updateGlobalTaskQueue)((0, _global.getGlobalTaskQueue)().concat(tasks instanceof Array ? tasks : [tasks]));
  return state;
}
/**
 * A helpful alias for providing just one task.
 * `withTask(state, task1)` is the same as `withTasks(state, [task1])`.
 */


var withTask = withTasks;
/**
 * In order to make it easy to track down incorrect uses for `withTask`, we capture exception
 * objects for every call to withTask. This has some performance overhead, so you'll
 * probably want to disable it in production.
 *
 * Note that if you're using Webpack's hot reload, we disable this functionality by default.
 */

exports.withTask = withTask;

function disableStackCapturing() {
  enableStackCapture = false;
}
/*
 * Helpers
 */


function trace(message) {
  try {
    throw new Error(message);
  } catch (e) {
    return e;
  }
}