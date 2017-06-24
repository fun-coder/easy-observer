'use strict';

let currentFn = null;

export const collectObserver = observer => {
  if (currentFn) observer.register(currentFn);
};
export const observeFn = fn => {
  currentFn = fn;
  fn();
  currentFn = null;
};