"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobalTaskQueue = getGlobalTaskQueue;
exports.updateGlobalTaskQueue = updateGlobalTaskQueue;
exports.getLastWithTaskCall = getLastWithTaskCall;
exports.setLastWithTaskCall = setLastWithTaskCall;
exports.clearLastWithTaskCall = clearLastWithTaskCall;

/**
 * For apps using Redux, we provide `withTasks` for `lift`ing tasks
 * out of a "sub-reducer" into the top-level app's space. This helps remove
 * extra plumbing that would potentially add boilerplate.
 *
 * To support this, we create a global record to collect tasks (and debug info).
 * Although this queue is global, we reset it between dispatches to the store.
 * You can think of this queue as a "thread local."
 *
 * We also want to make sure that if multiple versions of react-palm are loaded,
 * that we're able to have just a single queue.
 *
 * End users should not use any of these APIs directly. Instead, use the
 * redux middleware.
 */
// We attach an object to `window` or `global` with this name.
var GLOBAL_TASK_STATE = '___GLOBAL_TASK_STATE_e3b0c442';
// Try to determine the object representing the global namespace.
var GLOBAL = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

if (typeof GLOBAL[GLOBAL_TASK_STATE] !== 'undefined') {
  console.warn('More than one copy of react-palm was loaded. This may cause problems.');
} else {
  Object.defineProperty(GLOBAL, GLOBAL_TASK_STATE, {
    ennumerable: false,
    value: {
      tasks: [],
      lastWithTaskCall: null
    }
  });
}
/*
 * Getters and setters used by test utils and redux middlware.
 * Again, you probably don't need to ever use these directly.
 */


function getGlobalTaskQueue() {
  return GLOBAL[GLOBAL_TASK_STATE].tasks;
}

function updateGlobalTaskQueue(newQueue) {
  GLOBAL[GLOBAL_TASK_STATE].tasks = newQueue;
}

function getLastWithTaskCall() {
  return GLOBAL[GLOBAL_TASK_STATE].lastWithTaskCall;
}

function setLastWithTaskCall(last) {
  GLOBAL[GLOBAL_TASK_STATE].lastWithTaskCall = last;
}

function clearLastWithTaskCall() {
  GLOBAL[GLOBAL_TASK_STATE].lastWithTaskCall = null;
}