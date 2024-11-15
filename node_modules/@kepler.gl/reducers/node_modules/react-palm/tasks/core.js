"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._run = _run;
exports.fromPromise = fromPromise;
exports.fromPromiseWithProgress = fromPromiseWithProgress;
exports.fromCallback = fromCallback;
exports.taskCreator_ = taskCreator_;
exports.reportTasksForTesting = reportTasksForTesting;
exports.all = all;
exports.allSettled = allSettled;

// A task that either returns, or errors
// A function that does some side-effect when run.
// A function that runs an effector for some environment.
// In test, we provide one that doesn't call the effectful
// function, instead providing a mock response.
// Private API for running a task. Do not use this directly.
// We need this because Task is an opaque type, and we
// hide `.run` outside this file.
function _run(task, fnApplication, success, error, context) {
  if (typeof task.run !== 'function') {
    throw new Error('Attempted to run something that is not a task.');
  }

  return task.run(fnApplication, success, error, context);
}
/*
 * A function that takes some Arg and returns a new task.
 */


/**
 * ## `Task.fromCallback`
 * Returns a task-creator from a function that returns a promise.
 *
 * `arg => Promise<string[]>` -> `arg => Task<string[]>`.
 *
 * Uses the second arg as a label for debugging.
 */
function fromPromise(fn, label) {
  var creator = function creator(outbound) {
    return taskCreator_(function (success, error) {
      return fn(outbound).then(success, error);
    }, outbound, label);
  };

  creator.type = label;
  return creator;
}

var noop = function noop() {};
/**
 * ## `Task.fromCallbackWithProgress`
 * Returns a task-creator from a function that returns a promise.
 *
 * `({arg, onProgress}) => Promise<string[]>` -> `({arg, onProgress}) => Task<string[]>`.
 *
 * Uses the second arg as a label for debugging.
 */


function fromPromiseWithProgress(fn, label) {
  var creator = function creator(_ref) {
    var arg = _ref.arg,
        onProgress = _ref.onProgress;
    var task = taskCreator_(function (success, error, context) {
      return fn({
        arg: arg,
        onProgress: (context ? function (v) {
          return context.onProgress(onProgress(v));
        } : noop) || noop
      }).then(success, error);
    }, {
      arg: arg,
      onProgress: onProgress
    }, label);
    return task;
  };

  creator.type = label;
  return creator;
}
/**
 * `Task.fromCallback`
 *
 * Turn a node-style callback function:
 *     `(arg, cb: (err, res) => void) => void`)
 * into a task creator of the same type.
 *
 * Uses the second arg as a label for debugging.
 */


function fromCallback(fn, label) {
  var creator = function creator(outbound) {
    return taskCreator_(function (success, error) {
      return fn(outbound, function (err, result) {
        return err ? error(err) : success(result);
      });
    }, outbound, label);
  };

  creator.type = label;
  return creator;
}

/*
 * This is the private constructor for creating a Task object. End users
 * probably want to use `Task.fromCallback` or `task.fromPromise`.
 * It adds instrumentation to the effector, and also attaches some info
 * useful for making assertions in test.
 */
function taskCreator_(effector, payload, label) {
  // Instrument the task with reporting
  var effectorPrime = function effectorPrime(success, error, context) {
    reportEffects('start', newTask, payload);
    return effector(function (result) {
      reportEffects('success', newTask, result);
      return success(result);
    }, function (reason) {
      reportEffects('error', newTask, reason);
      return error(reason);
    }, context);
  };

  effectorPrime.payload = payload;
  effectorPrime.type = label;

  var newTask = _task(payload, function (runEffect, success, error, context) {
    return runEffect(effectorPrime, success, error, context);
  }, label);

  return newTask;
} // Internal task constructor.
// Note that payload is only kept around for testing/debugging purposes
// It should not be introspected outside of test


function _task(payload, next, label) {
  return {
    label: label,
    type: label,
    payload: payload,

    /*
     * Given the effector (or a mock), kicks off the task.
     * You (the end user) probably don't need to call this
     * directly. The middleware should handle it.
     */
    run: next,

    /*
     * Public Task Methods
     */
    chain: chain,
    map: map,
    bimap: bimap
  };

  function map(successTransform) {
    return _task(payload, function (runEffect, success, error, context) {
      return next(runEffect, function (result) {
        return success(successTransform(result));
      }, error, context);
    }, label);
  }

  function bimap(successTransform, errorTransform) {
    return _task(payload, function (runEffect, success, error, context) {
      return next(runEffect, function (result) {
        return success(successTransform(result));
      }, function (reason) {
        return error(errorTransform(reason));
      }, context);
    }, label);
  }

  function chain(chainTransform) {
    return _task(payload, function (runEffect, success, error, context) {
      return next(runEffect, function (result) {
        var chainTask = chainTransform(result);
        return chainTask.run(runEffect, success, error, context);
      }, error, context);
    }, "Chain(".concat(label, ")"));
  }
}
/*
 * Record the inputs/outputs of all tasks, for debugging or inspecting.
 * This feature should not be used to implement runtime behavior.
 */


var reportEffects = function reportEffects(event, task, payload) {};
/**
 * ## `reportTasksForTesting`
 *
 * Takes a function that is called whenever a task is dispatched,
 * returns, or errors.
 *
 * Note that only one function can be registered with this hook.
 * The last provided function is the one that takes effect.
 */


function reportTasksForTesting(fn) {
  reportEffects = fn;
} // type level utils functions needed for Task.all


/*
 * ## `Task.all`
 *
 * Given an array of Tasks, returns a new task that runs all the effects
 * of the original in parallel, with an array result where each element
 * corresponds to a task.
 *
 * Acts like `Promise.all`.
 */
function all(tasks) {
  return _task(tasks.map(function (task) {
    return task.payload;
  }), function (runEffect, success, error, context) {
    if (tasks.length === 0) {
      return success([]);
    }

    var accumulated = Array(tasks.length);
    var complete = 0;
    var errorValue = null;

    function allSuccess(index) {
      return function (value) {
        if (errorValue) {
          return;
        }

        accumulated[index] = value;
        complete += 1;

        if (complete === tasks.length) {
          return success(accumulated);
        }
      };
    }

    function anyError(err) {
      if (!err) {
        return;
      }

      errorValue = err;
      return error(errorValue);
    }

    return Promise.all(tasks.map(function (task, index) {
      return task.run(runEffect, allSuccess(index), anyError, context);
    }));
  }, 'Task.all(' + tasks.map(function (_ref2) {
    var type = _ref2.type;
    return type;
  }).join(', ') + ')');
}

/*
 * ## `Task.allSettled`
 *
 * Given an array of Tasks, returns a new task that runs all the effects
 * of the original in parallel, with an array result where each element
 * corresponds to a task.
 *
 * Acts like `Promise.allSettled`.
 */
function allSettled(tasks) {
  return _task(tasks.map(function (task) {
    return task.payload;
  }), function (runEffect, success, error, context) {
    if (tasks.length === 0) {
      return success([]);
    }

    var accumulated = Array(tasks.length);
    var complete = 0;

    function onOneTaskFinish(index, status) {
      return function (value) {
        accumulated[index] = {
          status: status,
          value: value
        };
        complete += 1;

        if (complete === tasks.length) {
          return success(accumulated);
        }
      };
    }

    return Promise.allSettled(tasks.map(function (task, index) {
      return task.run(runEffect, onOneTaskFinish(index, 'fulfilled'), onOneTaskFinish(index, 'rejected'), context);
    }));
  }, 'Task.allSettled(' + tasks.map(function (_ref3) {
    var type = _ref3.type;
    return type;
  }).join(', ') + ')');
}